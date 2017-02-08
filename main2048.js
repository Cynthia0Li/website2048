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
    //console.log(board);
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
                theNumberCell.css("top", getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
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

$(document).keydown(function(event){
    //alert("---"+event.keyCode);
    switch (event.keyCode){
        case 37:  //left
            if(moveLeft()){
                //console.log("move over");
                generateOneNumber();
                isgameover();
            }
            break;
        case 38:  //up
            if(moveUp()){
                generateOneNumber();
                isgameover();
            }
            break;
        case 39:  //right
            if(moveRight()){
                generateOneNumber();
                isgameover();
            }
            break;
        case 40:  //down
            if(moveDown()){
                generateOneNumber();
                isgameover();
            }
            break;
    }
});

function isgameover(){
    
}

function moveLeft(){
    var flag = canMoveLeft( board );
    console.log(flag);
    if(!flag){
        return false;
    }
    //moveLft    
    for(var i=0; i<4; i++){
        for(var j=1; j<4; j++){
            if(board[i][j] != 0){
                //console.log(i+"-----"+j+"-----"+board[i][j]);
                for(var k=0; k<j; k++){
                    if(board[i][k] == 0 && !noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //console.log(j+"---的左边是零---"+k);
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && !noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0; 
                        //console.log(j+"---的左边值相同---"+k);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        console.log(canMoveRight(board));
        return false;
    }
    //moveRight    
    for(var i=0; i<4; i++){
        for(var j=2; j>=0; j--){
            if(board[i][j] != 0){
                //console.log(i+"-----"+j+"-----"+board[i][j]);
                for(var k=3; k>j; k--){
                    if(board[i][k] == 0 && !noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;                        
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && !noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0; 
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        console.log(canMoveUp(board));
        return false;
    }
    //moveUp   
    for(var i=0; i<4; i++){
        for(var j=1; j<4; j++){
            if(board[j][i] != 0){
                //console.log(i+"-----"+j+"-----"+board[i][j]);
                for(var k=0; k<j; k++){
                    if(board[k][i] == 0 && !noBlockVertical(i,k,j,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;                        
                        continue;
                    }
                    else if(board[k][i] == board[j][i] && !noBlockVertical(i,k,j,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        //add
                        board[k][i] += board[j][i];
                        board[j][i] = 0;                         
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        console.log(canMoveDown(board));
        return false;
    }
    //moveDown   
    for(var i=0; i<4; i++){
        for(var j=2; j>=0; j--){
            if(board[j][i] != 0){
                //console.log(i+"-----"+j+"-----"+board[i][j]);
                for(var k=3; k>j; k--){
                    if(board[k][i] == 0 && !noBlockVertical(i,j,k,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;                        
                        continue;
                    }
                    else if(board[k][i] == board[j][i] && !noBlockVertical(i,j,k,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        //add
                        board[k][i] += board[j][i];
                        board[j][i] = 0;                         
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

