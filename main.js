song = "";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide;

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
}

function preload(){

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("MODEL LOADED LETS GOOOOOOOOOOOO");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = "+leftWristX+", Left wrist Y = "+leftWristY);

        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Right wrist X = "+rightWristX+", Right wrist Y = "+rightWristY);
    }
}

