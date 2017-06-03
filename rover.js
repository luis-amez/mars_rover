var ORIENTATIONS = ['N','E','S','W'];
var GRID = [10,10];

var obstacles = [[2,2],[5,8]];

var firstRover = {
  name: 'Amy',
  position: [0,0],
  direction: 'N',
  status: 1
};

var secondRover = {
  name: 'Bob',
  position: [9,9],
  direction: 'S',
  status: 1
};

function setup() {
  addObstacle(firstRover.position);
  addObstacle(secondRover.position);
}

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

function removeObstacle(position) {
  var index = obstacles.indexOf(position);
  if(index > -1) {
    obstacles.splice(index, 1);
  }
}

function addObstacle(position) {
  obstacles.push(position);
}

function showPosition(rover) {
  console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

function getInstructions() {
  var instructions = prompt("Please, set movement instructions:\n" +
                            " - f: forward\n" +
                            " - b: backward\n" +
                            " - r: turn right\n" +
                            " - l: turn left\n" +
                            "Example: ffrblff");
  return instructions;
}

function moveRover(rover) {
  removeObstacle(rover.position);
  instructions = getInstructions();
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
  addObstacle(rover.position);
}

moveRover(firstRover);
moveRover(secondRover);
