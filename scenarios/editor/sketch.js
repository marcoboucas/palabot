let states = {}
let connections = []

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
  for (let connection of connections) {
    let stat1 = states[connection.initialState]
    let [x1, y1] = getCoord(stat1.ptx, stat1.pty)
    let stat2 = states[connection.finalState]
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