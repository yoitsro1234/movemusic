song = "music.mp3";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded(){
    console.log("MODEL LOADED LETS GOOOOOOOOOOOO");
}


function gotPoses(results){
    if(results.length > 0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score(Accuracy) : "+scoreLeftWrist+", Right Wrist Score(Accuracy) : "+scoreRightWrist);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = "+leftWristX+", Left wrist Y = "+leftWristY);

        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Right wrist X = "+rightWristX+", Right wrist Y = "+rightWristY);
    }
}


function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristX > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

        if(rightWristX > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }

        if(rightWristX > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
            }

        if(rightWristX > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }

        if(rightWristX > 400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        lwyn = Number(leftWristY);
        lrmd = floor(lwyn);
        volume = lrmd/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
