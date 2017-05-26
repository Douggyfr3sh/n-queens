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


// window.decimalToMatrixHelper = function(n, decimalIndex) {
//   // This function takes in a decimal number and
//   // produces an n by n matrix, with leading 0s if necessary,
//   // representing the binary representation of that decimal number.

//   /*
//                   [0, 0, 0]  (for a 3 by 3 matrix)
//   8   >  1000  >  [0, 0, 1]
//                   [0, 0, 0]
//   */

//   var binaryMatrix = []; // our matrix to hold the result
//   var decToBinResult = [];

//   var buildBinaryNumber = function(num) {
//     if (num > 1) {
//       // console.log('unshift > ', decToBinResult.unshift(num % 2));
//       decToBinResult.unshift(num % 2);
//       buildBinaryNumber(Math.floor(num / 2));
//     } else {
//       // console.log('unshift > ', decToBinResult.unshift(num));
//       decToBinResult.unshift(num);
//     }
//   };
//   // we now have line20array with a binary representation of our decimal number
//   buildBinaryNumber(decimalIndex);
//   //console.log('decToBinResult > ', decToBinResult);

//   //Add leading zeroes
//   while (decToBinResult.length < n * n) {
//     decToBinResult.unshift(0);
//   }

//   //Determine number of pieces ('1's);
//   var pieceCnt = 0;
//   for (var i = 0; i < decToBinResult.length; i++) {
//     if (decToBinResult[i] === 1) {
//       pieceCnt++;
//     }
//   }

//   //If not exactly n number of '1's, return -1 error value
//   if (pieceCnt !== n) {
//     return -1;
//   }


//   //console.log('decToBinResult > ', decToBinResult);
//   //var popVal; var onesCntPerRow;
//   for (var row = n-1; row >= 0; row--) {
//     //onesCntPerRow = 0;
//     for (var col = n-1; col >= 0; col--) {
//       //var popVal = decToBinResult.pop();
//       if (binaryMatrix[row] === undefined) {
//         binaryMatrix[row] = [decToBinResult.pop()]; //change to popVal
//       } else {
//         binaryMatrix[row].unshift(decToBinResult.pop()); //change to popVal
//       }
//       //if (popVal === 1) onesCntPerRow++;
//       //if (onesCntPerRow > 1) return -1; -- can immediately return since
//       //any time a row has >1 piece it cannot be a solution
//     }
//   }



//   //console.log('binary matrix: ', binaryMatrix);

//   return binaryMatrix;
// };


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
  console.log('solition > ', solution);  /// [ [1] ]

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
        if (!solution.hasColConflictAt(i) && !solution.hasRowConflictAt(countOfPieces - 1)) {
          if (countOfPieces === n) {
            // console.log('line 117 solution rows ------------------: ', solution.rows());
            firstSolution = solution.rows();
            return firstSolution;
          } else
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