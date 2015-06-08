<?php namespace App\Http\Controllers;

use App\Story;
use Request;
use DB;

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
    
    public function getSubtree($id=1) 
    {
        //Returns 
        //subtree of a story to a certain depth
        //a portion of the preceding storyline
        
        //Find First Story
        $story = Story::find($id);
        
        //Increment Story Visits
        $story->visits = $story->visits + 1;
        
        //Set First Story (For Tweaking)
        if ($id == 1) {
            //$story->line = "Inhale";
            $story->top = true;
        }
        $story->save();
        
        $first = new \Illuminate\Database\Eloquent\Collection;
        $first->add($story);
        
        //Find all branches to depth d
        $depth = 15;
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
        
        return $tree;
        
    }
    
    public function begin()
	{
        $stories = $this->getSubtree();
		return view('index',compact('stories'));
	}
    
    public function show($id)
    {
        return redirect('/');
        
        //Depricated
        session_start(); 
        if (isset($_SESSION["newBranch"]) && !empty($_SESSION["newBranch"])) {
            if ($id != $_SESSION["newBranch"]) {
                $_SESSION["lastUpdated"] = 0;
                $_SESSION["newBranch"] = 0;
            }
        }
        
        //Find Current Story
        $story = Story::find($id);
        
        //Increment Story Visits
        $story->visits = $story->visits + 1;
        $story->save();
        
        //Find Branches
        $branches = Story::where('parentID', '=', $story->id)->get();
        
        //Find StoryLine
        $storyLine = [  ];
        
        //ADD stories to storyline until beginning is found
        while (true) {
            //CHECK IF TOP
            $siblings = Story::where('parentID', '=', $story->parentID)->get();
            
            $topVisits = -1;
            for ($x = 0; $x < count($siblings); $x++) {
                if ($siblings[$x]->visits > $topVisits){
                    //dd($siblings);
                    $topVisits = $siblings[$x]->visits;
                }
            } 
            //dd($siblings);
            $story->top = $story->visits >= $topVisits;
            
            
            array_push( $storyLine, $story );
            if ($story->id == 1)
                break;
            $story = Story::find($story->parentID);
            
        }
        
        $stories = [$storyLine, $branches];
        
        return view('index',compact('stories'));
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
        $story-> visits = 0;
        $story-> save();
        
        $id = $story->id;
        session_start(); 
        $_SESSION["lastUpdated"] = $story-> parentID;
        $_SESSION["newBranch"] = $id;
        
        return $story;
    }
    
}
