//test file
let capture;

function setup() {
    createCanvas(390, 240);
    capture = createCapture(VIDEO);
    capture.size(320, 240);
    capture.hide();

    /*colors = new tracking.ColorTracker(['cyan']);
    //start detecting the tracking
    colors.on('track', function (event) {
        trackingData = event.data
    });*/
}

function draw() {
    background(255);
    image(capture, 0, 0, 320, 240);
    filter(THRESHOLD);

    //if (capture.loadedmetadata) {
    //    let c = capture.get(0, 0, 100, 100);
    //    image(c, 0, 0);
    //}
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        noLoop();
        capture.loadPixels();
        for (let y = 0; y < height; y += 10) {
            for (let x = 0; x < width; x += 10) {
                const i = y * width + x;
                const darkness = (255 - capture.pixels[i * 4]) / 255;
                const radius = 10 * darkness;
                ellipse(x, y, radius, radius);
            }
        }
    }
}

// https://kylemcdonald.github.io/cv-examples/
/*
var capture;
var w = 640;
var h = 480;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function () {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.size(w, h);
    createCanvas(w, h);
    capture.hide();
}

var backgroundPixels;

function resetBackground() {
    backgroundPixels = undefined;
}

function getRadioValue(name) {
    var inputs = selectAll('input');
    for (var i = 0; i < inputs.length; i++) {
        var x = inputs[i];
        if (name == x.elt.name && x.elt.checked) {
            return x.elt.value;
        }
    }
}

function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) {
        dst = new src.constructor(n);
    }
    while (n--) {
        dst[n] = src[n];
    }
    return dst;
}

function draw() {
    capture.loadPixels();
    if (capture.pixels.length > 0) { // don't forget this!
        if (!backgroundPixels) {
            backgroundPixels = copyImage(capture.pixels, backgroundPixels);
        }
        var i = 0;
        var pixels = capture.pixels;
        var thresholdAmount = select('#thresholdAmount').value() * 255. / 100.;
        var thresholdType = getRadioValue('thresholdType');
        if (thresholdType === 'rgb') {
            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    pixels[i] = pixels[i] - backgroundPixels[i] > thresholdAmount ? 255 : 0;
                    i++;
                    pixels[i] = pixels[i] - backgroundPixels[i] > thresholdAmount ? 255 : 0;
                    i++;
                    pixels[i] = pixels[i] - backgroundPixels[i] > thresholdAmount ? 255 : 0;
                    i++;
                    i++; // skip alpha
                }
            }
            select('#presence').elt.innerText = 'Not applicable';
        } else if (thresholdType === 'bw') {
            var total = 0;
            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    // another common type of background thresholding uses absolute difference, like this:
                    // var total = Math.abs(pixels[i+0] - backgroundPixels[i+0] > thresholdAmount) || ...
                    var rdiff = Math.abs(pixels[i + 0] - backgroundPixels[i + 0]) > thresholdAmount;
                    var gdiff = Math.abs(pixels[i + 1] - backgroundPixels[i + 1]) > thresholdAmount;
                    var bdiff = Math.abs(pixels[i + 2] - backgroundPixels[i + 2]) > thresholdAmount;
                    var anydiff = rdiff || gdiff || bdiff;
                    var output = 0;
                    if (anydiff) {
                        output = 255;
                        total++;
                    }
                    pixels[i++] = output;
                    pixels[i++] = output;
                    pixels[i++] = output;
                    i++; // skip alpha
                }
            }
            var n = w * h;
            var ratio = total / n;
            select('#presence').elt.innerText = int(100 * ratio) + '%';
        } else {
            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    pixels[i] = pixels[i] - backgroundPixels[i];
                    i++;
                    pixels[i] = pixels[i] - backgroundPixels[i];
                    i++;
                    pixels[i] = pixels[i] - backgroundPixels[i];
                    i++;
                    i++; // skip alpha
                }
            }
            select('#presence').elt.innerText = 'Not applicable';
        }
    }
    capture.updatePixels();

    image(capture, 0, 0, 640, 480);
}
*/

/* if (keyCode === RIGHT_ARROW) {
   if (event.data.length === 0) {
     return;
   }else {
     event.data.forEach(function(rect) {})
  }
     if (trackingData) { //if there is tracking data to look at, then...
         for (var i = 0; i < trackingData.length; i++) { //loop through each of the detected colors
             console.log(trackingData[i].x)
             let newX = floor(trackingData[i].x / cell_size);
             let newY = floor(trackingData[i].y / cell_size);
             world[newX][newY].alive = trackingData[i].width%2; // create conway board
         }
     }
 }*/