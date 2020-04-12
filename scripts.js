//==============================================================================
// Initialization ==============================================================
//==============================================================================

var blankLocation = 0;
var boxes = document.getElementsByClassName('case');
var shuffleButton = document.getElementById('shuffle-button');
var cheatButton = document.getElementById('cheat-button');

var finalValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];

//==============================================================================
// Fonctions ===================================================================
//==============================================================================

function areEqualArrays(t1, t2) {
  for (var i = 0; i < t1.length; i++) {
    if (t1[i] !== t2[i]) return false;
  }
  return true;
}

function cheat() {
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, '', 15];

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = values[i];
    if (boxes[i].innerHTML != '') boxes[i].onclick = move;
  }

  blankLocation = getBlankLocation(boxes);
}

function getBlankLocation() {
  var i = 0;
  while (boxes[i].innerHTML != '') {
    i++;
  }
  return i;
}

function getBoxIndex(value) {
  var i = 0;
  while (boxes[i].innerHTML != value) {
    i++;
  }
  return i;
}

function getNeighbors() {
  var neighbors = [];
  var blankLocation = getBlankLocation();
  if (blankLocation - 4 >= 0) {
    neighbors.push(blankLocation - 4);
  }
  if (blankLocation + 4 < 16) {
    neighbors.push(blankLocation + 4);
  }
  if (blankLocation - 1 >= 0) {
    if (blankLocation % 4 !== 0) neighbors.push(blankLocation - 1);
  }
  if (blankLocation + 1 < 16) {
    if (blankLocation % 4 !== 3) neighbors.push(blankLocation + 1);
  }
  return neighbors;
}

function move() {
  var neighbors = getNeighbors();
  var thisBoxIndex = getBoxIndex(parseInt(this.innerHTML));
  if (neighbors.includes(thisBoxIndex)) {
    var toMoveValue = boxes[thisBoxIndex].innerHTML;
    var blankLocation = getBlankLocation();
    boxes[thisBoxIndex].innerHTML = '';
    values[thisBoxIndex] = '';
    boxes[thisBoxIndex].onclick = null;
    boxes[blankLocation].innerHTML = toMoveValue;
    values[blankLocation] = parseInt(toMoveValue);
    boxes[blankLocation].onclick = move;
  } else {
    alert('Mouvement impossible !');
  }
  // Check if the current puzzle is the final one
  if (areEqualArrays(values, finalValues)) {
    alert('Félicitations, tu as gagné ! Tu as le droit de recommencer !');
    window.location.reload();
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function shufflePuzzle() {
  shuffleArray(values);

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = values[i];
    if (boxes[i].innerHTML != '') boxes[i].onclick = move;
  }

  blankLocation = getBlankLocation(boxes);
}

//==============================================================================
// Script ======================================================================
//==============================================================================

shufflePuzzle();

shuffleButton.onclick = shufflePuzzle;
cheatButton.onclick = cheat;
