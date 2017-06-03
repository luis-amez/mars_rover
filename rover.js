var ORIENTATIONS = ['N','E','S','O'];
var GRID = [10,10];

var myRover = {
  position: [0,0],
  direction: 'N'
};

function goForward(rover) {
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
}

function goBackward(rover) {
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
  for(var i = 0; i < instructions.length; i++) {
    switch (instructions[i]) {
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
        continue;
    }
    showPosition(rover);
  }
}

moveRover(myRover);
