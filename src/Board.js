// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
       // this.set(params); //modified
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    /*
      this.attributes  > this is an instance of Board
      this.attributes = {
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        n = 4
      }

     */




    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let count = 0;

      // iterate over this.attributes[rowIndex]
      for (let i = 0; i < this.attributes[rowIndex].length; i++) {
        if (this.attributes[rowIndex][i] === 1) {
          count ++;
        }
      }

      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (let prop in this.attributes) {
        if (prop !== 'n') {
          if (this.hasRowConflictAt(prop)) {
            return true;
          }
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //define a counter var = 0
      let count = 0;
      //iterate over this.attributes to look at
      //a specific col in each row
      for (let row in this.attributes) {
        if (row !== 'n') {
          //check if col at colIndex = 1 in current row
          if (this.attributes[row][colIndex] === 1) {
            //increment counter
            count ++;
          }
        }
      }
      //if counter > 1 return true else false
      return count > 1 ? true : false;
    },

/*
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
*/

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //call hasColConflictAt on each col index
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i) === true) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    //old function parameter name: majorDiagonalColumnIndexAtFirstRow
    hasMajorDiagonalConflictAt: function(rowIndex, columnIndex) {
      let count = 0;
      let colIndex = columnIndex;
      //for every row (n)
      for (var i = rowIndex; i < this.attributes.n; i++) {
        //if arg + i is defined
        if (this.attributes[i] !== undefined && this.attributes[i][colIndex] !== undefined) {
          //for arg + i at the current row
          if (this.attributes[i][colIndex] === 1) {
            count++;
          }

        } else {
          //We reached the bounds of the gameboard
          return count > 1 ? true : false;
        }

        colIndex++;
      }

      //Return based on piece count
      return count > 1 ? true : false;

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //use nested for loop to call every valid combo
      for (var i = 0; i < this.attributes.n; i++) {
        for (var j = 0; j < this.attributes.n; j++) {
          if(this.hasMajorDiagonalConflictAt(i,j)) {
            return true;
          }
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowIndex, columnIndex) {
      let count = 0;
      let colIndex = columnIndex;
      //for every row (n)
      for (var i = rowIndex; i < this.attributes.n; i++) {
        //if arg + i is defined
        if (this.attributes[i] !== undefined && this.attributes[i][colIndex] !== undefined) {
          //for arg + i at the current row
          if (this.attributes[i][colIndex] === 1) {
            count++;
          }

        } else {
          //We reached the bounds of the gameboard
          return count > 1 ? true : false;
        }

        colIndex--;
      }

      //Return based on piece count
      return count > 1 ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //use nested for loop to call every valid combo
      for (var i = 0; i < this.attributes.n; i++) {
        for (var j = 0; j < this.attributes.n; j++) {
          if(this.hasMinorDiagonalConflictAt(i,j)) {
            return true;
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
