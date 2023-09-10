//ALL VARIABLES
var musicArray = ["1","2"];
var audio;
var i =0;

var play = document.querySelector(".play");

play.addEventListener("click", function() {musicPlay(startInSeconds)});

var pause = document.querySelector(".pause");

pause.addEventListener("click",musicPause);

var left = document.querySelector(".left");

left.addEventListener("click",musicLeft);

var right = document.querySelector(".right");

right.addEventListener("click",musicRight);

var progressBarContainer = document.querySelector(".progress-bar-container")

progressBarContainer.addEventListener("mousedown", startDrag);

progressBarContainer.addEventListener("mousemove", updateProgressBar);

document.addEventListener("mouseup", stopDrag);

var progressBar = document.querySelector(".progress-bar");

var isDragging = false;

var startInSeconds = 0;
//ALL FUNCTIONS
function musicPlay(startInSeconds){
     audio = new Audio("music/"+ musicArray[i]+".mp3");

    audio.currentTime = startInSeconds;

    audio.play();
    play.disabled = true;
    
    var image = document.querySelector(".picture");
    
    image.src="images/"+musicArray[i]+".jpg";
   
    
    audio.addEventListener("timeupdate", updateProgressBar1);
   
}

function musicPause(){
    audio.pause();
    startInSeconds = audio.currentTime;
    play.disabled = false;
}

function musicLeft(){
    if(i!=0){
        i--;
    }
    else{
        i= musicArray.length-1;
    }
    audio.pause();
    musicPlay(0);
}
function musicRight(){
    if(i!=musicArray.length-1){
        i++;
    }
    else{
        i=0;
    }
    audio.pause();
    musicPlay(0);
}

function updateProgressBar1(){
   
    var percentage = (audio.currentTime / audio.duration) *100;

   

    progressBar.style.width = percentage+"%";
}

function startDrag(){
    isDragging = true;
    updateProgressBar();
}

function updateProgressBar(event){
    if(!isDragging){
        return;
    }
    var clickX = event.clientX - progressBarContainer.getBoundingClientRect().left;
    var containerWidth = progressBarContainer.offsetWidth;
    var percentage =(clickX/ containerWidth) *100;

    percentage = Math.min(100,Math.max(0,percentage));

    var newPositionInSeconds = (percentage/100) * audio.duration;

    audio.currentTime = newPositionInSeconds;
    progressBar.style.width = percentage +"%";
}
function stopDrag(){
    isDragging=false;
}
