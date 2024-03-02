let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
let ballradius = 10;
let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 2; // velocity in x
let dy = -2; // velocity in y
let paddleheight = 10; // tray
let paddlewidth =75;
let paddlex = (canvas.width - paddlewidth)/2; // movement of paddle in x axis 
let rightpressed = false;
let leftpressed = false;
let brickrowcount =3;
let brickcolumncount = 5;
let brickwidth =75;
let brickheight = 20;
let brickpadding= 10;
let brickoffsettop = 30; 
let brickoffsetleft =30;
let score =0;
let lives =3;

let bricks =[];
for(let c=0;c<brickcolumncount;c++ ){
    bricks[c]=[];
    for(let r = 0;r<brickrowcount;r++){
        bricks[c][r]={x:0,y:0 , status:1};
    }
}

const keydownhandler = e =>{
    if(e.key == "Right" || e.key =="ArrowRight"){
        rightpressed =true;
    }
    else if(e.key == "Left" || e.key =="ArrowLeft"){
        leftpressed=true;
    }
}


const keyuphandler = e =>{
    if(e.key == "Right" || e.key =="ArrowRight"){
        rightpressed =false;
    }
    else if(e.key == "left" || e.key =="ArrowLeft"){
        leftpressed=false;
    }
}

const collisionDetector =()=>{
    for(let c =0;c<brickcolumncount;c++){
        for(let r =0;r<brickrowcount;r++){
            let b = bricks[c][r];
            if(b.status==1){
                if(x>b.x && x<b.x + brickwidth && y>b.y && y<b.y + brickheight){
                    dy = -dy;
                    b.status =0;
                    score++;
                    if(score==15){
                        alert("YOU WON , CONRGATS");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

const mouseMoveHandler =e=>{
    let relativex = e.clientx - canvas.offsetLeft;
    if(relativex > 0 && relativex<canvas.width){
        paddlex = relativex -paddlewidth/2;
    }
}

document.addEventListener("keydown",keydownhandler,false);
document.addEventListener("keyup",keyuphandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);


const drawBall =()=>{
    ctx.beginPath();// neeche x,y decide the direction of moving ball
    ctx.arc(x,y,10,0,Math.PI*2); //ctx.arc(origin at x,origin at y , radius , starting angle , total angle)
    ctx.fillStyle ="#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawpaddle =()=>{
    ctx.beginPath();
    ctx.rect(paddlex,canvas.height-paddleheight,paddlewidth,paddleheight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawbrick =()=>{
    for(let i =0;i<brickcolumncount;i++){
        for(let r = 0;r<brickrowcount;r++){
            if(bricks[i][r].status==1){
            let brickx =(
                i*(brickwidth+brickpadding)
             
            )+brickoffsetleft;
            let bricky = (
                r*(brickheight+brickpadding)
            )+brickoffsettop;
            
            bricks[i][r].x = brickx;
            bricks[i][r].y = bricky;
            
            ctx.beginPath();
            ctx.rect(brickx,bricky,brickwidth,brickheight);
            ctx.fillStyle ="red";
            ctx.fill();
            ctx.closePath();
        }
    }
    }
}


const drwascore =()=>{
     ctx.font = "16px Arial";
     ctx.fillStyle="black";
     ctx.fillText("Score: "+score,8,20);
}

const drawlive =()=>{
    ctx.font = "16px Arial";
    ctx.fillStyle="black";
    ctx.fillText("Lives: "+lives,canvas.width-65,20);
} 

// to get the bouncing effect 
const draw = ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawbrick();
   
    drawBall();
    drawpaddle();
    drwascore();
    drawlive();
    collisionDetector();
    if(x+dx>canvas.width-ballradius || dx+x<ballradius){
        dx = -dx;
    }
    
    if(dy+y<ballradius){
        dy = -dy;
    }
    else if(y+dy>canvas.height-ballradius){
        if(x>paddlex && x<paddlex+paddlewidth){
            dy = -dy;
        }
        else{
            lives--;
            if(!lives){
            alert("GAME OVER");
            document.location.reload();
            
        }
        else{
            x = canvas.width/2;
            y = canvas.height-50;
            dx=3;
            dy=-3;
            paddlex = (canvas.width - paddlewidth)/2;
        }
    }
}
    if(rightpressed && paddlex<canvas.width-paddlewidth){
        paddlex+=7;
        
    }
    else if (leftpressed && paddlex>0){
        paddlex-=7;
    }
    x+=dx; // inc velocity in x
    y+=dy; // inc velocity in y
    requestAnimationFrame(draw);
}

draw();
