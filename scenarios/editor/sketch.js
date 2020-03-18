let states = {
  0: {
    "title": "Begin",
    "root": true,
    "answer": "Hi ! How are you ?",
    "ptx": 0,
    "pty": 1
  }
}

let conditions = [

]

let stateSize = 40;
let statePadding = 20;
let stateTotalPadding = statePadding + stateSize;
let initialPadding = statePadding + stateSize / 2
let spotSize = 10;
let spotColor = [255, 0, 0];

let statW = 30;
let statH = 20;
let statC = [0, 0, 255]

let width, height;

let hoverState = undefined;
let hoverStateC = [0, 255, 0];
let selectedState = undefined;
let selectedStateC = [0, 255, 255];

let hoverSpot = undefined;
let hoverSpotC = [0, 255, 0];

let isDragging = false;

function setup() {
  // put setup code here
  width = windowWidth;
  height = windowHeight * 0.75
  createCanvas(width, height);

}

function draw() {
  background(0)

  translate(initialPadding, initialPadding)
  // Drawing bubbles where a state can be placed

  noStroke();
  fill(spotColor[0], spotColor[1], spotColor[2])
  for (let x = 0; x < width; x += stateTotalPadding) {
    for (let y = 0; y < height; y += stateTotalPadding) {
      ellipse(x, y, spotSize)
    }
  }
  if (hoverSpot != undefined) {
    fill(hoverSpotC[0], hoverSpotC[1], hoverSpotC[2])
    ellipse(hoverSpot[0] * stateTotalPadding, hoverSpot[1] * stateTotalPadding, spotSize)
  }

  strokeWeight(3);
  stroke(255, 255, 0)
  for (let condition of conditions) {
    let stat1 = states[condition.initialState]
    let [x1, y1] = getCoord(stat1.ptx, stat1.pty)
    let stat2 = states[condition.finalState]
    let [x2, y2] = getCoord(stat2.ptx, stat2.pty)
    line(x1, y1, x2, y2)
  }




  stroke(255);
  strokeWeight(1);
  fill(statC[0], statC[1], statC[2]);
  rectMode(CENTER);
  for (let state of Object.values(states)) {
    [x,
      y
    ] = getCoord(state.ptx, state.pty);
    rect(x, y, statW, statH);
  }
  if (hoverState != undefined) {
    fill(hoverStateC[0], hoverStateC[1], hoverStateC[2]);
    state = states[hoverState];
    [x,
      y
    ] = getCoord(state.ptx, state.pty);
    rect(x, y, statW, statH);
  }
  if (selectedState != undefined) {
    fill(selectedStateC[0], selectedStateC[1], selectedStateC[2]);
    state = states[selectedState];
    [x,
      y
    ] = getCoord(state.ptx, state.pty);
    rect(x, y, statW, statH);
  }


  if (isDragging && selectedState != undefined) {
    stat1 = states[selectedState];
    let [x, y] = getCoord(stat1.ptx, stat1.pty);
    strokeWeight(2);
    stroke(255, 255, 0);
    line(x, y, mouseX - initialPadding, mouseY - initialPadding)
  }




}

function getCoord(ptx, pty) {
  return [
    ptx * stateTotalPadding,
    pty * stateTotalPadding
  ]
}

function isInState(x1, y1) {
  for (let [id, state] of Object.entries(states)) {
    let [x2,
      y2
    ] = getCoord(state.ptx, state.pty);
    if (Math.abs(x1 - x2) < statW && Math.abs(y1 - y2) < statH) {
      return id;
    }
  }
  return undefined
}

function isInSpot(x, y) {
  dx = Math.round(x / stateTotalPadding);
  dy = Math.round(y / stateTotalPadding);
  xp = dx * stateTotalPadding;
  yp = dy * stateTotalPadding;

  if ((xp - x) ** 2 + (yp - y) ** 2 < spotSize ** 2 / 4) {
    return [dx, dy]
  }
  return undefined
}

function addState(ptx, pty) {
  newState = {
    "title": "",
    "root": false,
    "answer": "",
    "ptx": ptx,
    "pty": pty
  }
  // Adding in the first void spot
  for (let i = 0; i >= 0; i++) {
    if (!(i in states)) {
      states[i] = newState;
      return;
    }
  }
}

function removeState(id) {
  if (Object.keys(states).length == 1) {
    states = {}
  } else {
    delete states[id];
  }
}

function mouseMoved() {
  let x = mouseX - initialPadding;
  let y = mouseY - initialPadding;

  hoverState = undefined;
  hoverSpot = undefined;

  let nearestSpot = isInSpot(x, y);
  let nearestState = isInState(x, y)
  if (nearestState != undefined) {
    hoverState = nearestState;
  } else if (nearestSpot != undefined) {
    hoverSpot = nearestSpot;
  }
}

mouseDragged = mouseMoved;

function mouseReleased() {
  if (isDragging && hoverState != selectedState && selectedState != undefined && hoverState != undefined) {
    // We add a condition link between the first and the second state
    newCondition = {
      "initialState": selectedState,
      "finalState": hoverState
    }
    conditions.push(newCondition)
  }
  isDragging = false
  if (0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height) {
    updateSelectedState(undefined)
    if (hoverState != undefined) {
      updateSelectedState(hoverState)
      hoverState = undefined;
    } else if (hoverSpot != undefined) {
      addState(hoverSpot[0], hoverSpot[1])
    }
  }
}

function mousePressed() {
  if (hoverState != undefined && hoverState == selectedState) {
    isDragging = true;
  }
}

function getListInputs() {
  let liste = [];
  for (let ele of document.getElementsByTagName('input')) {
    liste.push(ele.id)
  }

  return liste
}

function updateState(ele) {
  if (selectedState) {
    let label = ele.id;
    let value = ele.value;
    if (!isNaN(Number(value))) {
      value = Number(value)
    }

    states[selectedState][label] = value
  }
}

function updateSelectedState(id) {
  selectedState = id;
  if (selectedState != undefined) {
    let state = states[id];
    for (let eleId of getListInputs()) {
      document.getElementById(eleId).value = state[eleId]
    }
  } else {
    for (let eleId of getListInputs()) {
      document.getElementById(eleId).value = ""
    }
  }
}
updateSelectedState(undefined)