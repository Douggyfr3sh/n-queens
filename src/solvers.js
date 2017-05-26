/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/
*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

/*
  hasRowConflictAt
  hasAnyRowConflicts
  hasColConflictAt
  hasAnyColConflicts
  hasAnyMajorDiagonalConflicts
  hasAnyMinorDiagonalConflicts
*/

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  var countOfPieces = 0;
  var firstSolution;

  var inner = function() {
    if (firstSolution !== undefined) {
      return firstSolution;
    } else {
      for (var i = 0; i < n; i++) {
        solution.togglePiece(countOfPieces, i);
        countOfPieces++;
        //console.log('count of pieces: ', countOfPieces);


        // we are using countOfPieces as our row and i as our column
        if (!solution.hasColConflictAt(i) && !solution.hasRowConflictAt(countOfPieces - 1)) {
          if (countOfPieces === n) {
            // console.log('line 117 solution rows ------------------: ', solution.rows());
            firstSolution = solution.rows();
            return firstSolution;
          } else {
            inner();
          }
        }
        if (firstSolution !== undefined) {
          return firstSolution;
        } else {
          countOfPieces--;
          solution.togglePiece(countOfPieces, i);
        }
      }
    }
  };

  inner();
  //console.log('expected matrix? ', firstSolution);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(firstSolution));
  return firstSolution;
};








// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var solution = new Board({n: n});
  var countOfPieces = 0;

  var inner = function() {
    for (var i = 0; i < n; i++) {
      solution.togglePiece(countOfPieces, i);
      countOfPieces++;

      // we are using countOfPieces as our row and i as our column
      if (!solution.hasColConflictAt(i) && !solution.hasRowConflictAt(countOfPieces - 1)) {
        if (countOfPieces === n) {
          // console.log('line 117 solution rows ------------------: ', solution.rows());
          solutionCount++;
        } else {
          inner();
        }
      }
      countOfPieces--;
      solution.togglePiece(countOfPieces, i);
    }
  };

  inner();

  return solutionCount;
};







// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //If n = 0, there is no gameboard
  if (n === 0) {
    return [];
  }

  //if n = 2 or 3, there is no valid solution
  if (n === 2) {
    return [[],[]];
  }

  if (n === 3) {
    return [[],[],[]];
  }

  var solution = new Board({n: n});
  console.log('solution > ', solution);  /// [ [1] ]

  var countOfPieces = 0;
  var firstSolution;

  var inner = function() {
    if (firstSolution !== undefined) {
      return firstSolution;
    } else {
      for (var i = 0; i < n; i++) {
        solution.togglePiece(countOfPieces, i);
        countOfPieces++;
        console.log('count of pieces: ', countOfPieces);


        // we are using countOfPieces as our row and i as our column
        if (!solution.hasColConflictAt(i) && !solution.hasRowConflictAt(countOfPieces - 1) && !solution.hasAnyMajorDiagonalConflicts() && !solution.hasAnyMinorDiagonalConflicts()) {
          if (countOfPieces === n) {
            // console.log('line 117 solution rows ------------------: ', solution.rows());
            firstSolution = solution.rows();
            return firstSolution;
          } else {
            inner();
          }
        }
        if (firstSolution !== undefined) {
          return firstSolution;
        } else {
          countOfPieces--;
          solution.togglePiece(countOfPieces, i);
        }
      }
    }
  };

  inner();
  console.log('expected matrix? ', firstSolution);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(firstSolution));
  return firstSolution;
};









// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  //If n = 0, there is no gameboard
  if (n === 0) {
    return 1;
  }

  //if n = 2 or 3, there is no valid solution
  if (n === 2) {
    return 0;
  }

  if (n === 3) {
    return 0;
  }

  var solutionCount = 0;

  var solution = new Board({n: n});
  var countOfPieces = 0;

  var inner = function() {
    for (var i = 0; i < n; i++) {
      solution.togglePiece(countOfPieces, i);
      countOfPieces++;

      // we are using countOfPieces as our row and i as our column
      if (!solution.hasColConflictAt(i) && !solution.hasRowConflictAt(countOfPieces - 1) && !solution.hasAnyMajorDiagonalConflicts() && !solution.hasAnyMinorDiagonalConflicts()) {
        if (countOfPieces === n) {
          // console.log('line 117 solution rows ------------------: ', solution.rows());
          solutionCount++;
        } else {
          inner();
        }
      }
      countOfPieces--;
      solution.togglePiece(countOfPieces, i);
    }
  };

  inner();

  return solutionCount;
};