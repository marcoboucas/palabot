function getCoord(ptx, pty) {
  return [
    ptx * stateTotalPadding,
    pty * stateTotalPadding
  ]
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
    // We add a connection link between the first and the second state
    addConnection(selectedState, hoverState)
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