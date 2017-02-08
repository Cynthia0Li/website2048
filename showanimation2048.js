function showNumberWithAnimation(i,j,num){
    //console.log(i+"  "+i+"   "+num);
    var numberCell = $("#number-cell-"+i+"-"+j);
    
    numberCell.css("background-color", getNumberBackgroundColor(num));
    numberCell.css("color", getNumberColor(num));
    numberCell.text(num);
    //console.log("add css")
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    //console.log("animation");
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}