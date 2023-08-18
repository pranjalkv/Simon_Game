let order=[]
let playerorder=[]
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict=false;
let noise=true;
let on=false;
let win;
let c=0;

const turnCounter=document.querySelector("#turn");
const cgreen=document.querySelector("#green");
const cred=document.querySelector("#red");
const cyellow=document.querySelector("#yellow");
const cblue=document.querySelector("#blue");
const strictbtn=document.querySelector("#strict");
const onbtn=document.querySelector("#on");
const startbtn=document.querySelector("#start");
const all_btn=document.querySelectorAll(".btn")
const save_hs=document.querySelector(".hgh");

const save=localStorage.getItem("high")
alert("WELCOME TO SIMON GAME- \n #1 ✔️ CHECK THE POWER BUTTON \n #2 THEN PRESS THE START BUTTON TO PLAY \n #3 IF YOU ✔️ CHECK THE SRICT MODE YOU HAVE TO START FROM LEVEL 1 AGAIN" )
window.onload=function()
{
    save_hs.innerHTML=save;
}

// // function disableClick()
// // {
// // for(let z=0;z<all_btn.length;z++)
// // {
// //     all_btn[z].classList.add("noclick");
// // }
// // }
// // function enableClick()
// // {
// //     for(let z=0;z<all_btn.length;z++)
// // {
// //     all_btn[z].classList.remove("noclick");
// // }
// }
strictbtn.addEventListener("click",(event)=>{
    if(strictbtn.checked== true)
    strict=true;
    else
    strict=false
});

onbtn.addEventListener("click",(event)=>{
if(onbtn.checked==true)
{
    on=true;
    turnCounter.innerHTML="-"
}
else
{
    on=false;
    turnCounter.innerHTML=""
    clearColor();
    clearInterval(intervalId)
}
});
startbtn.addEventListener("click",(event)=>{
    if(on || win)
    {
        startbtn.innerHTML="ON"
        startbtn.style.backgroundColor="Green"
        startbtn.classList.add("noclick")
        play();
    }

});


function play()
{
    win=false;
    order=[];
    playerorder=[]
    flash=0;
    intervalId=0
    turn=1;
    turnCounter.innerHTML="LEVEL:1"
    good=true;
    for(var i=0;i<20;i++)
    {
        order.push(Math.floor(Math.random()*4)+1);
    }
    compTurn=true;
    intervalId=setInterval(gameTurn,800)
}
function gameTurn()
{
    on=false;
    if(flash==turn)
    {
        clearInterval(intervalId);
        compTurn=false;
        clearColor();
        on=true;
        if(save<=turn)
        {
        save_hs.innerHTML=turn;
        localStorage.setItem("high",turn)
        }
    }
    if(compTurn)
    { 
        // document.querySelector("body").classList.add("noclick");
        clearColor()
         setTimeout(()=>{
            if(order[flash]==1)green();
            if(order[flash]==2)red();
            if(order[flash]==3)yellow();
            if(order[flash]==4)blue();
            flash++;
         },200)
    }
}
function green()
{
    if(noise)
    {
        let audio=new Audio("sounds/green.mp3")
        audio.play();
    }
    noise=true
    cgreen.style.backgroundColor="lightgreen"
}
function red()
{
    if(noise)
    {
        let audio=new Audio("sounds/red.mp3")
        audio.play();
    }
    noise=true
    cred.style.backgroundColor="tomato"
}
function yellow()
{
    if(noise)
    {
        let audio=new Audio("sounds/yellow.mp3")
        audio.play();
    }
    noise=true
    cyellow.style.backgroundColor="yellow"
}
function blue()
{
    if(noise)
    {
        let audio=new Audio("sounds/blue.mp3")
        audio.play();
    }
    noise=true
    cblue.style.backgroundColor="lightskyblue"
}
function clearColor()
{
    cgreen.style.backgroundColor="darkgreen"
    cred.style.backgroundColor="darkred"
    cyellow.style.backgroundColor="goldenrod"
    cblue.style.backgroundColor="darkblue"
}
cgreen.addEventListener("click",(event)=>
{
    if(on)
    {
        playerorder.push(1);
        check();
        green();
        if(!win)
        {
            setTimeout(()=>{
                clearColor();
            },300)
        }
    }
})
cred.addEventListener("click",(event)=>
{
    if(on)
    {
        playerorder.push(2);
        check();
        red();
        if(!win)
        {
            setTimeout(()=>{
                clearColor();
            },300)
        }
    }
})
cyellow.addEventListener("click",(event)=>
{
    if(on)
    {
        playerorder.push(3);
        check();
        yellow();
        if(!win)
        {
            setTimeout(()=>{
                clearColor();
            },300)
        }
    }
})
cblue.addEventListener("click",(event)=>
{
    if(on)
    {
        playerorder.push(4);
        check();
        blue();
        if(!win)
        {
            setTimeout(()=>{
                clearColor();
            },300)
        }
    }
})

function flashColor()
{

     cgreen.style.backgroundColor="lightgreen"
    cred.style.backgroundColor="tomato"
    cyellow.style.backgroundColor="yellow"
    cblue.style.backgroundColor="lighskyblue"

}

function check()
{
    if(playerorder[playerorder.length-1]!==order[playerorder.length-1])
    good=false;

    if(playerorder.length==20 && good)
    {
        winGame();
    }
    if(good==false)
    {
        flashColor();
        turnCounter.innerHTML="NO!"
        setTimeout(()=>{
            turnCounter.innerHTML="LEVEL:"+turn;
            clearColor();

            if(strict)
            {
                play();
            }
            else{
                compTurn=true;
                flash=0;
                playerorder=[];
                good=true;
                intervalId=setInterval(gameTurn,800)
            }
        },1000)
        noise=false;
    }
    if(turn==playerorder.length && good && !win)
    {
        turn++
        playerorder=[]
        compTurn=true;
        flash=0;
        turnCounter.innerHTML="LEVEL:"+turn;
        intervalId=setInterval(gameTurn,800)
    }
}

function winGame()
{
    flashColor();
    document.querySelector("body").style.backgroundColor="lawngreen";
    setTimeout(()=>{
        document.querySelector("body").style.backgroundColor="gray";
    },2000);
    turnCounter.innerHTML="WIN!"
    on=false;
    win=true;
}
