var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
});

function newgame(){
    //init grid-container
    console.log("begin init");
    init();
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
    $("#\.number-call").remove();
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            $("#grid-container").append("<div class="number-cell" id="number-cell-"+i+"-"+j></div>");
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            
            if(board[i][j]==0)
            {
                theNumberCell.css("width", 0px);
                theNumberCell.css("height", 0px);
                theNumberCell.css("top", getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
            }
            else
            {
                theNumberCell.css("width", 100px);
                theNumberCell.css("height", 100px);
                theNumberCell.css("top", getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}