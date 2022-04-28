scoreRightWrist=0;
scoreLeftwrist=0;
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('poseNet is initialized');
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0&&rightWristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100&&rightWristY<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWristY>200&&rightWristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300&&rightWristY<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    }
    if(scoreLeftwrist>0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
}
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftwrist="+scoreLeftwrist);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist="+scoreRightWrist);
        leftWristY=results[0].pose.leftWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        console.log('leftWristX='+leftWristX+'leftwristY='+leftWristY);
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        console.log('rightWristX='+rightWristX+'rightwristY='+rightWristY);

    }
}
