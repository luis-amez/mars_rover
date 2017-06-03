var ORIENTATIONS = ['N','E','S','O'];
var GRID = [10,10];

var obstacles = [[2,2],[5,8]];

var myRover = {
  position: [0,0],
  direction: 'N',
  status: 1
};

function goForward(rover) {
  var origin = rover.position.slice();
  switch(rover.direction) {
    case 'N':
      rover.position[0]++;
      break;
    case 'E':
      rover.position[1]++;
      break;
    case 'S':
      rover.position[0]--;
      break;
    case 'W':
      rover.position[1]--;
      break;
  }
  checkBoundaries(rover);
  if(isObstacle(rover)) {
    rover.position = origin;
  }
}

function goBackward(rover) {
  var origin = rover.position.slice();
  switch(rover.direction) {
    case 'N':
      rover.position[0]--;
      break;
    case 'E':
      rover.position[1]--;
      break;
    case 'S':
      rover.position[0]++;
      break;
    case 'W':
      rover.position[1]++;
      break;
  }
  checkBoundaries(rover);
  if(isObstacle(rover)) {
    rover.position = origin;
  }
}

function turnRight(rover) {
  var orientation = ORIENTATIONS.indexOf(rover.direction);
  orientation = (orientation + 1) % 4;
  rover.direction = ORIENTATIONS[orientation];
}

function turnLeft(rover) {
  var orientation = ORIENTATIONS.indexOf(rover.direction);
  orientation = (orientation + 3) % 4;
  rover.direction = ORIENTATIONS[orientation];
}

function checkBoundaries(rover) {
  for(var i = 0; i < GRID.length; i++) {
    if(rover.position[i] < 0) {
      rover.position[i] += GRID[i];
    } else if(rover.position[i] >= GRID[i]) {
      rover.position[i] %= GRID[i];
    }
  }
}

function isObstacle(rover) {
  var collision = false;
  obstacles.forEach(function(obstacle){
    if(rover.position[0] == obstacle[0] && rover.position[1] == obstacle[1]) {
      collision = true;
      rover.status = 0;
      console.log("Obstacle detected at: [" + rover.position[0] + ", " + rover.position[1] + "]");
    }
  });
  return collision;
}

function showPosition(rover) {
  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

function moveRover(rover) {
  var instructions = prompt("Please, set movement instructions:\n" +
                            " - f: forward\n" +
                            " - b: backward\n" +
                            " - r: turn right\n" +
                            " - l: turn left\n" +
                            "Example: ffrblff");
  var instruction = 0;
  while(instruction < instructions.length && rover.status == 1) {
    switch (instructions[instruction]) {
      case 'f':
        goForward(rover);
        break;
      case 'b':
        goBackward(rover);
        break;
      case 'r':
        turnRight(rover);
        break;
      case 'l':
        turnLeft(rover);
        break;
      default:
        console.log("Invalid instruction.");
    }
    showPosition(rover);
    instruction++;
  }
}

moveRover(myRover);
