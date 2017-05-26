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