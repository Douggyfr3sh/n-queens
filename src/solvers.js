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


window.decimalToMatrixHelper = function(n, decimalIndex) {
  // This function takes in a decimal number and
  // produces an n by n matrix, with leading 0s if necessary,
  // representing the binary representation of that decimal number.

  /*
                  [0, 0, 0]  (for a 3 by 3 matrix)
  8   >  1000  >  [0, 0, 1]
                  [0, 0, 0]
  */

  var binaryMatrix = []; // our matrix to hold the result
  var decToBinResult = [];
  //initialize an array to store count of #pieces in each col
  var colPiecesCnt = [];
  for (var i = 0; i < n; i++) { colPiecesCnt.push(0); }

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
  //console.log('decToBinResult > ', decToBinResult);

  //Add leading zeroes
  while (decToBinResult.length < n * n) {
    decToBinResult.unshift(0);
  }

  //Determine number of pieces ('1's);
  var pieceCnt = 0;
  for (var i = 0; i < decToBinResult.length; i++) {
    if (decToBinResult[i] === 1) {
      pieceCnt++;
<<<<<<< HEAD
      if (pieceCnt > n) {
        return -1;  //If we have too many pieces return immediately
      }
    }
  }

  //If not exactly n number of '1's, return -1 error value
  if (pieceCnt !== n) {
    return -1;
  }


  //console.log('decToBinResult > ', decToBinResult);
  //var popVal; var onesCntPerRow;
  var popVal;
  var onesCntPerRow;
  for (var row = n-1; row >= 0; row--) {
    onesCntPerRow = 0;
    for (var col = n-1; col >= 0; col--) {
      popVal = decToBinResult.pop();
      if (binaryMatrix[row] === undefined) {
        binaryMatrix[row] = [popVal]; //change to popVal
      } else {
        binaryMatrix[row].unshift(popVal); //change to popVal
      }
      if (popVal === 1) {
        onesCntPerRow++;
        colPiecesCnt[col]++;
      }
      //any time a row has >1 piece it cannot be a solution
      if (onesCntPerRow > 1 || colPiecesCnt[col] > 1) return -1; //-- can immediately return
=======
    }
  }

  //If not exactly n number of '1's, return -1 error value
  if (pieceCnt !== n) {
    return -1;
  }


  //console.log('decToBinResult > ', decToBinResult);
  //var popVal; var onesCntPerRow;
  for (var row = n-1; row >= 0; row--) {
    //onesCntPerRow = 0;
    for (var col = n-1; col >= 0; col--) {
      //var popVal = decToBinResult.pop();
      if (binaryMatrix[row] === undefined) {
        binaryMatrix[row] = [decToBinResult.pop()]; //change to popVal
      } else {
        binaryMatrix[row].unshift(decToBinResult.pop()); //change to popVal
      }
      //if (popVal === 1) onesCntPerRow++;
      //if (onesCntPerRow > 1) return -1; -- can immediately return since
      //any time a row has >1 piece it cannot be a solution
>>>>>>> 7219d72335028ee144e0ba73ffcbe220ae14fa95
    }
  }



  //console.log('binary matrix: ', binaryMatrix);

  return binaryMatrix;
};

<<<<<<< HEAD

/*
  hasRowConflictAt
  hasAnyRowConflicts
  hasColConflictAt
  hasAnyColConflicts
*/

window.findNRooksSolution = function(n) {
  var solution; // = new Board({n: n});
  //iterate over all possible game boards from 2(exp n) - 1 to 2(exp n*n) - 1
  var start = (2 ** n) - 1;  //1
  var end = (2 ** (n*n)) - 1; // 65535
  for (var i = start; i <= end; i++) {
    //for each iteration, check using relevant helper functions
    //if decToMatrixHelper(n,i) !== -1
    solution = decimalToMatrixHelper(n,i);
    if (solution !== -1) {
      //Our helper function now does col and row collission testing for us!
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      return solution; //
    }
  }
};








=======
>>>>>>> 7219d72335028ee144e0ba73ffcbe220ae14fa95

/*
  hasRowConflictAt
  hasAnyRowConflicts
  hasColConflictAt
  hasAnyColConflicts
*/

<<<<<<< HEAD
=======
window.findNRooksSolution = function(n) {
  var currentMatrix;
  var solution; // = new Board({n: n});
  //iterate over all possible game boards from 2(exp n) - 1 to 2(exp n*n) - 1
  var start = (2 ** n) - 1; //Math.pow(7, 2); // > 49
  var end = (2 ** (n*n)) - 1;
  for (var i = start; i <= end; i++) {
    //for each iteration, check using relevant helper functions
    //if decToMatrixHelper(n,i) !== -1
    if (decimalToMatrixHelper(n,i) !== -1) {
      currentMatrix = decimalToMatrixHelper(n,i);  // given 1,1  => [ [1] ]
      solution = new Board(currentMatrix);
      console.log('solution board = ', solution);
      //hasAnyRowConflicts(decimalToMatrixHelper(n, i));
      //hasAnyColumnConflicts(decimalToMatrixHelper(n, i));
      if (!solution.hasAnyRowConflicts() && !solution.hasAnyColConflicts()) {
        //if both return false, return currentMatrix, as it is a valid solution
        console.log('Single solution for ' + n + ' rooks:', JSON.stringify(currentMatrix));
        return currentMatrix;
      }
    }
  }
};
>>>>>>> 7219d72335028ee144e0ba73ffcbe220ae14fa95

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
<<<<<<< HEAD
=======


>>>>>>> 7219d72335028ee144e0ba73ffcbe220ae14fa95
