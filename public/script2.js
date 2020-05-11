//------GLOBAL letS---------------------------------
let song;
let button;
let amp;

let audioCon = new AudioContext();
let audioEl = document.querySelector("audio");
let track = audioCon.createMediaElementSource(audioEl);
let gainNode = audioCon.createGain();
gainNode.gainValue = 0.4;
let analyser = audioCon.createAnalyser();
track.connect.(gainNode).connect(audioCon.destination);

//------CLASSES----------------------------------


//------ FUNCTIONS-----------------------------------
function setup() {
    let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    /*song = loadSound('Dance with the Dead - The Dawn.mp3', loaded);
    amp = new p5.Amplitude();*/
}

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
}

function keyPressed() {
    //if (keyCode == 32) {
    //    audioCon.resume();
    //    console.log("SPACE");
    //}
}

document.querySelector('button').addEventListener('click', function () {
    context.resume().then(() => {
        console.log('Playback resumed successfully');
    });
});

/*
function loaded() {
    button = createButton('play');
    button.mousePressed(togglePlaying);
}
*/
function draw() {
    background(151);
    /*
    let vol = amp.getLevel();
    let diam = map(vol, 0, 0.3, 10, 200);

    fill(255, 0, 255);
    ellipse(width / 2, height / 2, diam, diam);*/
}

/*function togglePlaying() {
    if (!song.isPlaying()) {
        song.play();
        song.setVolume(0.3);
        button.html('pause');
    } else {
        song.stop();
        button.html('play');
    }
}*/