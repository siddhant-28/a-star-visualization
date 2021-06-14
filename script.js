
function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder')
    background(255, 0, 200);

    w = width / cols;
    h = height / rows;

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
   
   for (var i = 0; i < cols; i++) {
       for (var j = 0; j < rows; j++) {
           grid[i][j] = new Spot(i, j);
       }
   }

   for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
        grid[i][j].addNeighbours(grid);
        }
    }

    start = grid[0][0]
    end = grid[cols-1][rows-1]
    start.wall = false;
    end.wall = false;
    openSet.push(start);
    console.log(grid);
}


function draw() {
    background(0);
    if(startClicked) {

    if (openSet.length > 0){
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if(openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        current = openSet[winner];

        if (current === end) {
            startClicked = false;
            console.log("DONE!");

            document.getElementById("resetAlgo").addEventListener("click", function() {
                startClicked = false;
                path = [];
                openSet = [];
                closedSet = [];
                resetWalls();   
                openSet.push(start);
                current = null;
            })
        }

        removefromArray(openSet, current);
        closedSet.push(current);

        var neighbours = current.neighbours;
        for ( var i = 0; i < neighbours.length; i++) {
            var neighbour = neighbours[i];
            
            if (!closedSet.includes(neighbour) && !neighbour.wall) {
                var tempG = current.g + 1;
                var newPath = false;
                if(openSet.includes(neighbour)) {
                    if (tempG < neighbour.G) {
                        neighbour.g = tempG;
                        newPath = true;
                    }
                }

                else {
                    neighbour.g = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }
                if (newPath) {
                    neighbour.h = heuristic(neighbour, end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }

            }
        }
    }
    else {
        console.log("No solution found!")
        noLoop();
        return;

    }

    path = [];
    var temp = current
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
}

 
    colorGrid();

    colorClosedSet();
    colorOpenSet();
    updatePath();

}


function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
  }

function windowResized() {
    centerCanvas();
}

function mouseDragged() {
    
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if(Math.floor(mouseX/w) == i && Math.floor(mouseY/w) == j) {
                //console.log(i + " " + j);
                grid[i][j].addWall();
                grid[i][j].show(color(255));
            }
        }
    }
}

function colorOpenSet() {
    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255 ,0 ));
    }
}

function colorClosedSet() {
    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0 ,0 ));
    }
}

function resetWalls() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].removeWall();
    
        }
    }
}

function colorGrid() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
    
        }
    }
}

function updatePath () {
    for (var i = 0; i < path.length; i++) {
        path[i].show(color(0, 0 ,255));
    }
}








