function addConnection(initialState, finalState) {
  if (!isConectionAlreadyAdded(initialState, finalState)) {
    newCondition = {
      "initialState": initialState,
      "finalState": finalState
    }
    connections.push(newCondition)
  }
}

function isConectionAlreadyAdded(initialState, finalState) {
  for (let connection of connections) {
    if (connection.initialState == initialState && connection.finalState == finalState) {
      return true
    } else if (connection.initialState == finalState && connection.finalState == initialState) {
      return true
    }
  }
  return false
}

function removeConnection(initialState, finalState) {
  for (let i = 0; i < connections.length; i++) {
    let connection = connections[i];
    if (connection.initialState == initialState && connection.finalState == finalState) {
      connections.splice(i, 1)
      return;
    } else if (connection.initialState == finalState && connection.finalState == initialState) {
      connections.splice(i, 1)
      return;
    }
  }
}