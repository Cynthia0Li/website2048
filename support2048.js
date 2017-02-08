function getPosTop(i,j){
    //console.log("top"+i+"-"+j);
    return 20+i*120;
}

function getPosLeft(i,j){
    //console.log("left"+i+"-"+j);
    return 20+j*120;
}

function getNumberBackgroundColor(num){
    switch(num){
        case 2: return "#eee4da";break;
        case 4: return "#ede0c8";break;
        case 8: return "#f2b179";break;
        case 16: return "#f59563";break;
        case 32: return "#f67e5f";break;
        case 64: return "#f65e3b";break;
        case 128: return "#edcf72";break;
        case 256: return "#edcc61";break;
        case 512: return "#9c0";break;
        case 1024: return "#33b5e5";break;
        case 2048: return "#09c";break;
        case 4096: return "#a6c";break;
        case 8192: return "#93c";break;
    }
}

function getNumberColor(num){
    if(num <= 4){
        return "#776e65";
    }
    return "white";
}

function nospace(board){
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){
    //console.log(board);
    for(var i=0; i<4; i++){
        for(var j=1; j<4; j++){
            if(board[i][j] !=0){
                if(board[i][j]==board[i][j-1] || board[i][j-1]==0){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){    
    for(var i=0; i<4; i++){
        for(var j=2; j>=0; j--){            
            if(board[i][j] !=0){
                if(board[i][j]==board[i][j+1] || board[i][j+1]==0){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){    
    for(var i=0; i<4; i++){
        for(var j=1; j<4; j++){            
            if(board[j][i] !=0){
                if(board[j][i]==board[j-1][i] || board[j-1][i]==0){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){    
    for(var i=0; i<4; i++){
        for(var j=2; j>=0; j--){
            //console.log(board[i][j]);
            if(board[j][i] !=0){
                if(board[j][i]==board[j+1][i] || board[j+1][i]==0){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row,col1,col2,board){
    //console.log("horizontal");
    for(var i=col1+1; i<col2; i++){
        if(board[row][i] != 0){
            return true;
        }       
    }
    return false;
}

function noBlockVertical(col,row1,row2,board){    
    for(var i=row1+1; i<row2; i++){
        if(board[i][col] != 0){
            return true;
        }       
    }
    return false;
}