var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
});

function newgame(){
    //init grid-container
    console.log("begin init");
    init();
    
    generateOneNumber();
    generateOneNumber();
    //updateBoardView();
    console.log(board);
}

function init(){
    //console.log("111111111111");
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            //console.log("#grid-cell-"+i+"-"+j);
            var gridcell = $("#grid-cell-"+i+"-"+j);
            gridcell.css('top', getPosTop(i,j));
            gridcell.css('left', getPosLeft(i,j));
        }
    }
    for(var i=0; i<4; i++){
        board[i] = new Array();
        for(var j=0; j<4; j++){
            board[i][j] = 0;
        }
    }
    
    updateBoardView();
        
}

function updateBoardView(){
    //console.log("draw cell")
    $(".number-cell").remove();
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            //$("#grid-container").append('<div class="number-cell" id="number-cell-"+i+"-"+j></div>');
            $("#grid-container").append("<div class='number-cell' id='number-cell"+"-"+i+"-"+j+"'></div>");
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            //console.log(i+"---"+j+"---"+board[i][j]);
            if(board[i][j]==0)
            {
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
                //theNumberCell.text(board[i][j]);
            }
            else
            {
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                //1theNumberCell.addClass(".number-cell");
            }
        }
    }
}

function generateOneNumber(){
    //console.log("generate one number")
    if(nospace(board)){
        return false;
    }
    //location
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while(true){
        if(board[randx][randy] == 0){
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    
    //number
    var randnum = Math.random()>0.5 ? 2 : 4;
    
    //show
    board[randx][randy] = randnum;
    //console.log(randx+"  "+randy+"   "+randnum)
    showNumberWithAnimation(randx,randy,randnum);
    //console.log(board)
    return true;    
}

