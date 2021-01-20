 /***************************************************************************************************************/
/*                                                                                                               */
/*                               Advent of Code 2016 - Solutions of Problems                                     */
/*                                                                                                               */
/*   Author:     Marcel Krause                                                                                   */
/*   Date:       13.01.2021                                                                                      */
/*   Copyright:  Copyright (C) 2021, Marcel Krause                                                               */
/*   License:    GNU General Public License (GNU GPL-3.0-or-later)                                               */
/*                                                                                                               */
/*               This program is released under GNU General Public License (GNU GPL-3.0-or-later).               */
/*               This program is free software: you can redistribute it and/or modify it under the terms of the  */
/*               GNU General Public License as published by the Free Software Foundation, either version 3 of    */
/*               the License, or any later version.                                                              */
/*                                                                                                               */
/*               This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;       */
/*               without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.       */
/*               See the GNU General Public License for more details.                                            */
/*                                                                                                               */
/*               You have received a copy LICENSE.md of the GNU General Public License along with this program.  */
/*                                                                                                               */
 /***************************************************************************************************************/


/*---------------------------*/
/*        Main Program       */
/*---------------------------*/

var greeting = `+------------------------------------+
|                                    |
|         Advent of Code 2016        |
|         Day 02 - Riddle 02         |
|                                    |
+------------------------------------+
`
console.log(greeting);

// Load the data
var fs = require('fs');
fs.readFile( __dirname + '/Day02-01_input.dat', function (err, data) {
  if (err) {
    throw err; 
  }
  mainProgram(data.toString());
});

// Execute the main program
function mainProgram(data) {
    // Split the instruction lines into separate commands
    var codeInstructions = data.split(/\r?\n/);

    // Iterate over each command line
    var code = '';

    // Initialize the keypad position at '5', i.e. the middle
    var row = 2,
        col = 0;

    for (var line of codeInstructions) {
        // Iterate over the separate commands
        for (var command of line.split('')) {
            // Move the pointer to the next field
            switch(command) {
                case 'U':
                    if ( ( (row > 2) || ((col >= 3-row) && (col <= 1+row)) ) && (row > 0)) {
                        row -= 1;
                    }
                    break;
                case 'D':
                    if ( ( (row < 2) || ((col >= row-1) && (col <= 5-row)) ) && (row < 4)) {
                        row += 1;
                    }
                    break;
                case 'L':
                    if ( ( (col > 2) || ((row >= 3-col) && (row <= 1+col)) ) && (col > 0)) {
                        col -= 1;
                    }
                    break;
                case 'R':
                    if ( ( (col < 2) || ((row >= col-1) && (row <= 5-col)) ) && (col < 4)) {
                        col += 1;
                    }
                    break;
                default:
                    break;
            }
        }

        // Append the current number to the code
        var currCode, currCodeStr;
        switch(row) {
            case 0:
                currCodeStr = '1';
                break;
            case 1:
                currCode = 1 + col;
                currCodeStr = currCode.toString();
                break;
            case 2:
                currCode = 5 + col;
                currCodeStr = currCode.toString();
                break;
            case 3:
                if (col == 1) {
                    currCodeStr = 'A';
                }
                else if (col == 2) {
                    currCodeStr = 'B';
                }
                else {
                    currCodeStr = 'C';
                }
                break;
            case 4:
                currCodeStr = 'D';
                break;
            default:
                break;
        }
        code += currCodeStr;
    }

    // Output
    console.log(`The code to the bathroom is ${code}.`)
}