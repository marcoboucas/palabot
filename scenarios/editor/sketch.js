let scenario = [{
  "id": 0,
  "title": "Begin",
  "root": true,
  "answer": "Hi ! How are you ?",
  "ptx": 0,
  "pty": 1
}]

let scenarioSize = 40;
let scenarioPadding = 20;
let spotSize = 5;
let spotColor = [255, 0, 0];

let width, height;

function setup() {
  // put setup code here
  width = windowWidth;
  height = windowHeight * 0.75
  createCanvas(width, height);

}

function draw() {
  background(0)

  translate(scenarioPadding + scenarioSize / 2, scenarioPadding + scenarioSize / 2)
  // Drawing bubbles where a scenario can be placed

  noStroke();
  fill(spotColor[0], spotColor[1], spotColor[2])
  for (let x = 0; x < width; x += scenarioSize + scenarioPadding) {
    for (let y = 0; y < height; y += scenarioSize + scenarioPadding) {
      ellipse(x, y, spotSize)
    }
  }

  stroke(255);
  strokeWeight(1);
  fill(scenarC[0], scenarC[1], scenar[2])

}