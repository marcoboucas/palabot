let scenarios = {
  O: {
    "title": "Begin",
    "root": true,
    "answer": "Hi ! How are you ?",
    "ptx": 0,
    "pty": 1
  }
}

let scenarioSize = 40;
let scenarioPadding = 20;
let scenarioTotalPadding = scenarioPadding + scenarioSize;
let initialPadding = scenarioPadding + scenarioSize / 2
let spotSize = 10;
let spotColor = [255, 0, 0];

let scenarW = 30;
let scenarH = 20;
let scenarC = [0, 0, 255]

let width, height;

let hoverScenario = undefined;
let hoverScenarioC = [0, 255, 0];

let hoverSpot = undefined;
let hoverSpotC = [0, 255, 0];


function setup() {
  // put setup code here
  width = windowWidth;
  height = windowHeight * 0.75
  createCanvas(width, height);

}

function draw() {
  background(0)

  translate(initialPadding, initialPadding)
  // Drawing bubbles where a scenario can be placed

  noStroke();
  fill(spotColor[0], spotColor[1], spotColor[2])
  for (let x = 0; x < width; x += scenarioTotalPadding) {
    for (let y = 0; y < height; y += scenarioTotalPadding) {
      ellipse(x, y, spotSize)
    }
  }
  if (hoverSpot) {
    fill(hoverSpotC[0], hoverSpotC[1], hoverSpotC[2])
    ellipse(hoverSpot[0] * scenarioTotalPadding, hoverSpot[1] * scenarioTotalPadding, spotSize)
  }

  stroke(255);
  strokeWeight(1);
  fill(scenarC[0], scenarC[1], scenarC[2]);
  rectMode(CENTER);
  for (let scenario of Object.values(scenarios)) {
    [x,
      y
    ] = getCoord(scenario.ptx, scenario.pty);
    rect(x, y, scenarW, scenarH);
  }
  if (hoverScenario) {
    fill(hoverScenarioC[0], hoverScenarioC[1], hoverScenarioC[2]);
    scenario = scenarios[hoverScenario];
    [x,
      y
    ] = getCoord(scenario.ptx, scenario.pty);
    rect(x, y, scenarW, scenarH);
  }

}

function getCoord(ptx, pty) {
  return [
    ptx * scenarioTotalPadding,
    pty * scenarioTotalPadding
  ]
}

function isInScenario(x1, y1) {
  for (let [id, scenario] of Object.entries(scenarios)) {
    let [x2,
      y2
    ] = getCoord(scenario.ptx, scenario.pty);
    if (Math.abs(x1 - x2) < scenarW && Math.abs(y1 - y2) < scenarH) {
      return id;
    }
  }
  return false
}

function isInSpot(x, y) {
  dx = Math.round(x / scenarioTotalPadding);
  dy = Math.round(y / scenarioTotalPadding);
  xp = dx * scenarioTotalPadding;
  yp = dy * scenarioTotalPadding;

  if ((xp - x) ** 2 + (yp - y) ** 2 < spotSize ** 2 / 4) {
    return [dx, dy]
  }
  return false
}

function addScenario(ptx, pty) {
  newScenario = {
    "title": "",
    "root": false,
    "answer": "",
    "ptx": ptx,
    "pty": pty
  }
  scenarios[Object.keys(scenarios).length] = newScenario
}

function removeScenario(id) {
  for (let i = id; i < Object.keys(scenarios) - 2; i++) {
    scenarios[i] = scenarios[i + 1];
  }
  scenarios[Object.keys(scenarios) - 1] = undefined;

}

function mouseMoved() {
  let x = mouseX - initialPadding;
  let y = mouseY - initialPadding;

  hoverScenario = undefined;
  hoverSpot = undefined;

  let nearestSpot = isInSpot(x, y);
  let nearestScenario = isInScenario(x, y)
  if (nearestScenario) {
    hoverScenario = nearestScenario;
  } else if (nearestSpot) {
    hoverSpot = nearestSpot
  }
}