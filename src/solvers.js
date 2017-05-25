/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.decimalToMatrixHelper = function(nByN, decimalIndex) {

  var binaryMatrix = []; // our matrix to hold the result
  var decToBinResult = [];

  var buildBinaryNumber = function(num) {
    if (num > 1) {
      // console.log('unshift > ', decToBinResult.unshift(num % 2));
      decToBinResult.unshift(num % 2);
      buildBinaryNumber(Math.floor(num / 2));
    } else {
      // console.log('unshift > ', decToBinResult.unshift(num));
      decToBinResult.unshift(num);
    }
  };
  // we now have line20array with a binary representation of our decimal number
  buildBinaryNumber(decimalIndex);
  console.log('decToBinResult > ', decToBinResult);

    // take that line20array and make a matrix out of it:
    // (inner loop is columns, outer loop is rows)
    //
    // for n times
    //   for n times // starting in bottom right corner
    //     if (line20arr.len > 0)
    //       pop last value in our line20Array and put in current location
    //     else (we have popped all elementsout)
    //       start putting 0s in matrix
    //


  return binaryMatrix;

};

window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme

  // create an empty n by n gameboard

  /* recursive function fn{


      if pieces on board < n
        call helpers to check if conflicts on this gameboard
          if yes
            move a piece around
            recursive call fn
          else
            add a piece
            recursive call fn
      else // pieces on board === n
        call helpers to check if conflicts on this gameboard
          if yes
            move a piece around
          if no
            return gameboard


  } */




  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
