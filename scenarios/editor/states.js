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
      document.getElementById(eleId).value = state[eleId] != undefined ? state[eleId] : ""
    }
  } else {
    for (let eleId of getListInputs()) {
      document.getElementById(eleId).value = ""
    }
  }
}
updateSelectedState(undefined)