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
        
        //dd($stories);
        
		return view('index',compact('stories'));
	}
    
    public function begin()
	{
        //Find First Story
        $story = Story::find(1);
        
        //Set First Story (For Tweaking)
        $story->line = "Breathe";
        $story->save();
        $story->top = true;
        
        $storyLine = [ $story ]; 
        $branches = [];
        $stories = [$storyLine, $branches];
        
		return view('index',compact('stories'));
	}
    
    public function show($id)
    {
        session_start(); 
        if (isset($_SESSION["newBranch"]) && !empty($_SESSION["newBranch"])) {
            if ($id != $_SESSION["newBranch"]) {
                dd($id);
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
        
        return redirect('/story/' . $id);
    }
    
}
