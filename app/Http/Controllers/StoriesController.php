<?php namespace App\Http\Controllers;

use App\Story;
use App\User;
use App\Location;
use Request;
use DB;
use Auth;

class StoriesController extends Controller {
    
    private $story;
    
    public function __construct(Story $story) 
    {
        $this->story = $story;
    }
        
	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
        $stories = $this->story->get();
        
		return view('index',compact('stories'));
	}
    
    public function resetStoryVisits()
    {
        $storyline = Story::get();
        for ($i = 0; $i < count($storyline); $i++) {
            $storyline[$i]->visits = 0;
            $storyline[$i]->save();
        }
        dd($storyline);
    }
    
    /**
	 *Find and return the youngest ancestor of two
	 *
	 * param: the ids of two lines
	 */
    public function getYoungestAncestor($id1, $id2)
    {
        $a1 = $this->getAncestry($id1);
        $a2 = $this->getAncestry($id2);
        $youngestAncestor = null;
        $shortest = min(count($a1),count($a2));
        for ($i = 0; $i < $shortest; $i++) {
            if ($i < count($a2) && $a1[$i]['id'] == $a2[$i]['id'])
                $youngestAncestor = $a1[$i];
        }
        
        $b = $this->getBranches($a1[$shortest-1]['id']);
        //$b2 = $this->getBranches($a2[count($a2)-1]['id']);
        
        //$c1 = $this->commonStory($a1, $b);
        $c = $this->commonStory($a2, $b);
        
        //dd($b1,$b2);
        /*
        if (count($a1) != $shortest & $c1 != null)
            return $c1;*/
        //dd(count($a1) ,count($a2),$shortest);
        if (count($a2) != $shortest & $c != null)
            return $c;
        
        
        return $youngestAncestor;
        
        
    }
    
    /**
	 *Find and return common story in two collections
	 *
	 * param: two collections
     * return: a common element if it exists
     *          else null
	 */
    public function commonStory($a, $b) {
        for ($i = 0; $i < count($a); $i++)
            for ($j = 0; $j < count($b); $j++)
                if ($a[$i]['id'] == $b[$j]['id'])
                    return $a[$i];
        return null;
            
        
    }
        
    public function resetPrestige()
    {
        $authors = User::get();
        for ($i = 0; $i < count($authors); $i++) {
            $authors[$i]->prestige = 0;
            $authors[$i]->save();
        }
        dd($authors);
    }
    
    /**
	 *Update the current Line and User
	 *
	 * 
	 */
    public function updateCurrentLine($id) 
    {
        $reader = Auth::user();
        if ($reader == null)
            return;
        
        //Update reader location
        $loc = null;
        if (Location::where('uid', '=', $reader->id)->exists()) {
            $loc = Location::where('uid', $reader->id)->get()->first();
            
        } else {
            $loc = new Location;
            $loc->uid = $reader->id;
        }
        $loc->line_id = $id;
        $loc->save();
        
        //Find previous line
        $prev_line_id = $reader->current_line;
        
        if (Story::where('id', '=', $prev_line_id)->exists() != true)
            $prev_line_id=1;
        $story = Story::find($prev_line_id);
        
        //Visit each line in prev storyline
        while (true) {
            
            //UnVisit Story
            if ($story->visits > 0)
                $story->visits--;
            $story->save();
            
            //UnAward Prestige from author
            $author = User::find($story->authorID);
            if ($author != null) {
                if ($author->id != $reader->id) {
                    if ($author->prestige > 0) {
                        $author->prestige--;
                        $author->save();
                    }
                }
            }
            
            if ($story->id == 1)
                break;
            
            $story = Story::find($story->parentID);
        }
        
        //Find Current Line
        if (Story::where('id', '=', $id)->exists() != true)
            $id=1;
        $story = Story::find($id);
        
        //Visit each line in prev storyline
        $storyline = new \Illuminate\Database\Eloquent\Collection;
        $storyline->push( $story );
        while (true) {
            
            //Visit Story
            $story->visits++;
            $story->save();
            
            //Award Prestige from author
            $author = User::find($story->authorID);
            if ($author != null) {
                if ($author->id != $reader->id) {
                    $author->prestige++;
                    $author->save();
                }
            }
            
            if ($story->id == 1)
                break;
            
            $story = Story::find($story->parentID);
            $storyline->push( $story ); 
        }
        Auth::user()->current_line = $id;
        Auth::user()->save();
    }
    
    /**
	 *Return User locations
	 *
	 * 
	 */
    public function getUserLocations()
    {
        $locations = DB::table('locations')
            ->leftJoin('users', 'locations.uid', '=', 'users.id')
            ->get();
        $ul = Auth::user()->current_line;
        for ($i = 0; $i < count($locations); $i++) {
            $yca = $this->getYoungestAncestor($ul,$locations[$i]->line_id);
            
            //Set flag to indicate other user is not in immediate branch
            if ($locations[$i]->line_id!=$yca->id)
                $locations[$i]->in_distance = true;
            else $locations[$i]->in_distance = false;
            /*
            if ($i == 1)
                dd($yca,$ul,$locations[$i]->line_id);*/
            $locations[$i]->line_id = $yca->id;
            
            
            
        }
        return $locations;
    }
    
    /**
	 *Return Branches of a line
	 *
	 * 
	 */
    public function getBranches($id)
    {
        return Story::where('parentID', '=', $id)->get();
    }
    
    public function getSubtree($id=1, $depth = 11) 
    {
        //Returns 
        //subtree of a story to a certain depth
        //a portion of the preceding storyline
        
        //Find First Story
        if (!Story::where('id', '=', $id)->exists())
            $id=1;
        $story = Story::find($id);
        
        //Award Experience to the reader
        $reader = Auth::user();
        if ($reader != null) {
            $reader->experience += 1;
            $reader->save();
        }
        
        //Update Current Line
        if ($id != 1)
            $this->updateCurrentLine($id);
        
        //Set First Story (For Tweaking)
        if ($id == 1) {
            $story->line = "Chapter 1";
            $story->top = true;
        }
        $story->save();
        
        $first = new \Illuminate\Database\Eloquent\Collection;
        $first->add($story);
        
        //Find all branches to depth d
        $branches = [ $first ]; //first level of branches
        
        for ($x = 0; $x < $depth; $x++) {
            //Find Branches 
            $depth_branches = new \Illuminate\Database\Eloquent\Collection;
            if (count($branches[$x]) > 0) {
                for ($y = 0; $y < count($branches[$x]); $y++) {
                    $new_branches = Story::where('parentID', '=', $branches[$x][$y]->id)->get();
                    $appended = $depth_branches->merge($new_branches);
                    $depth_branches = $appended;
                }
            } else {
                break;
            }
            array_push($branches, $depth_branches);
        }
        
        //Merge all branches into a single collection
        $tree = new \Illuminate\Database\Eloquent\Collection;
        
        for ($x = 0; $x < count($branches); $x++) {
            $appended = $tree->merge($branches[$x]);
            $tree = $appended;
        }
        
        //Append preceding lines
        $height = 20;
        while ($height >= 0) {
            if ($story->id == 1)
                break;
            $story = Story::find($story->parentID);
            $tree->push( $story );
            $height--;
        }
        
        //Bind Author Names
        for ($x = 0; $x < count($tree); $x++) {
            $author = User::find($tree[$x]->authorID);
            if ($author == null)
                $tree[$x]->author_name = "Anonymous";
            else
                $tree[$x]->author_name = $author->name;
        }
        return $tree;
        
    }
    
    /**
	 *Traverse tree to root
     *param: line id
	 *return collection of all parents including line
	 * 
	 */
    public function getAncestry($id)
    {
        $story = Story::find($id);
        $trunk = new \Illuminate\Database\Eloquent\Collection;
        $trunk->push( $story );
        //Append preceding lines
        while (true) {
            if ($story->id == 1)
                break;
            $story = Story::find($story->parentID);
            $trunk->push( $story );
        }
        return $trunk->reverse();
    }
    
    public function begin()
	{
        $stories = $this->getSubtree(1,1);
		return view('index',compact('stories'));
	}
    
    public function show($id)
    {
        return redirect('/');
    }
    
    public function store()
    {
        $input = Request::all();
        $line = $input['line'];
        //CHECK for empty lines
        if ($line == "") 
            return redirect('/story/' . $input['parentID']);
        
        //CHECK for duplicate lines
        $line = trim ( strtolower ( $line ));
        $siblings = 
            Story::where('parentID', '=', $input['parentID'])->get();
        for ($x = 0; $x < sizeOf($siblings); $x++) {
            $siblingLine = trim ( strtolower ( $siblings[$x]->line ));
            if ($line == $siblingLine)
               return $this->show($siblings[$x]->id);
        }
        
        //STORE new story
        $story = new Story;
        $story-> line = $input['line'];
        $story-> parentID = $input['parentID'];
        $story-> authorID = $input['authorID'];
        $story-> visits = 0;
        $story-> save();
        
        //UPDATE user line ID array
        $user = User::find($input['authorID']);
        if ($user != null) {
            $story-> author_name = $user->name;
            
            if ($user->line_ids == "") {
                $line_ids = [];
            } else {
                $line_ids = json_decode($user->line_ids);
            }
            array_push($line_ids, $story->id);
            $user->line_ids = json_encode($line_ids);
            $user->save();
        }
        
        $id = $story->id;
        session_start(); 
        $_SESSION["lastUpdated"] = $story-> parentID;
        $_SESSION["newBranch"] = $id;
        
        return $story;
    }
    
    public function buildStory($id){
        $story = Story::find($id);
        if ($story == null)
            return ("That story hasn't been written");
        $storyLine = [];
        $storyLine[] = $story->line;
        while ($story->id != 1) {
            $story = Story::find($story->parentID);
            $storyLine[] = $story->line;
        }
        return(array_reverse ($storyLine));
    }
    
    public function destroy($id) 
    {
        //TODO add handling for users currently on line to be deleted
        if (Auth::user() == null) {
            return ('Who are you?');    
        }
        if (Auth::user()->id == 1) {
            $story = Story::find($id);
            if ($story == null) 
                return ('story does not exist');
            //To Destroy Line
            //Find Children
            $children = Story::where('parentID', '=', $story->id)->get();
            //Remove from author's line ID aray
            $author = User::find($story->authorID);
            $line_ids = json_decode($author->line_ids);
            $line_ids = array_diff($line_ids, array($id));
            
            if (sizeof($children) > 0) {
                return ("Unable to destroy, this line has children to care for :(");
            }
            $author->line_ids = json_encode($line_ids);
            $author->save();
            $story->delete();
            return ($story->line." destroyed");
        } else {
            return ('You do not have that power');
        }
    }
    
}
