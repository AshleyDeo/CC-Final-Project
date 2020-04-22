//------GLOBAL VARS---------------------------------
let world = [];
let maxLength = 146;
let maxHeight = 75;
let cell_size = 10;
let updateTimer = 0;

let a1_color;
let a2_color;
let a4_color;
let d_color;

//------CLASSES----------------------------------
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbors = 0;
        this.alive = Math.floor(random(0, 7)) % 4;
        this.age = 0;
    }

    update() {
        if (this.alive == 1) {
            if (this.neighbors > 3 || this.neighbors < 4) {
                this.alive = 0;
            } else {
                this.age++;
            }
        } else {
            this.alive = 0;
            if (this.neighbors == 2) {
                this.alive = 1;
                this.age = 0;
            }
        }
        if (this.alive == 1) {
            fill(a1_color);
        } else {
            if (this.neighbors < 2) {
                fill(d_color);
            }
            /* else if (this.neighbors < 4) {
                fill(a2_color);
            } else if (this.neighbors < 6) {
                fill(a3_color);
            } else {
                fill(a4_color);
            }*/
        }
        noStroke();
        rect(this.x * cell_size, this.y * cell_size, cell_size, cell_size);
    }
}

//------ FUNCTIONS-----------------------------------
function setup() {
    let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    d_color = color(255, 255, 255);
    a1_color = color(100, 255, 255);
    a2_color = color(102, 255, 150);
    a3_color = color(0, 255, 255);
    a4_color = color(255, 220, 255);

    for (let i = 0; i < maxLength; i++) {
        let arr = [];
        for (let j = 0; j < maxHeight; j++) {
            arr.push(new Cell(i, j));
        }
        world.push(arr);
    }
}

function draw() {
    if (frameCount % 10 == 0 && updateTimer > 0) {
        updateTimer--;
    }
    if (updateTimer <= 0) {
        updateTimer = 1;
        background(255, 255, 255);

        for (let i = 0; i < maxLength - 1; i++) {
            for (let j = 0; j < maxHeight - 1; j++) {
                countNeighbors(world[i][j]);
            }
        }
        for (let i = 0; i < maxLength - 1; i++) {
            for (let j = 0; j < maxHeight - 1; j++) {
                world[i][j].update();
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
}

function countNeighbors(curr_cell) {
    let neighbors = 0;
    //console.log(curr_cell.x + ", " + curr_cell.y);

    if (curr_cell.x > 0 && world[curr_cell.x - 1][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("U");
    }
    if (curr_cell.x < maxLength - 1 && world[curr_cell.x + 1][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("D");
    }
    if (curr_cell.y > 0 && world[curr_cell.x][curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("L");
    }
    if (curr_cell.y < maxHeight - 1 && world[curr_cell.x][curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("R");
    }
    if (curr_cell.x > 0 && curr_cell.y > 0 && world[curr_cell.x - 1][curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("UL");
    }
    if (curr_cell.x < maxLength - 1 && curr_cell.y > 0 && world[curr_cell.x + 1][curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("DL");
    }
    if (curr_cell.x > 0 && curr_cell.y < maxHeight - 1 && world[curr_cell.x - 1][curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("UR");
    }
    if (curr_cell.x < maxLength - 1 && curr_cell.y < maxHeight - 1 && world[curr_cell.x + 1][curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("DR");
    }
    curr_cell.neighbors = neighbors;
}


//Infinite space
/*if (world[((curr_cell.x - 1) % (maxLength - 1) + maxLength - 1) % (maxLength - 1)][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("U");
    }
    if (world[(curr_cell.x + 1) % (maxLength - 1)][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("D");
    }
    if (world[curr_cell.x][(((curr_cell.y - 1) % (maxHeight - 1) ) + maxHeight - 1) % (maxHeight-1)].alive == 1) {
        neighbors++;
        //console.log("L");
    }
    if (world[curr_cell.x][(curr_cell.y + 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("R");
    }
    if (world[((curr_cell.x - 1) % (maxLength - 1) + maxLength - 1) % (maxLength - 1)][(((curr_cell.y - 1) % (maxHeight - 1) ) + maxHeight - 1) %  maxHeight].alive == 1) {
        neighbors++;
        //console.log("UL");
    }
    if (world[(curr_cell.x + 1) % (maxLength - 1)][(((curr_cell.y - 1) % (maxHeight - 1)) + maxHeight - 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("DL");
    }
    if (world[((curr_cell.x - 1) % (maxLength - 1) + maxLength - 1) % (maxLength - 1)][(curr_cell.y + 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("UR");
    }
    if (world[(curr_cell.x + 1) % (maxLength - 1)][(curr_cell.y + 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("DR");
    }*/