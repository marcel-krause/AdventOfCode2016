 /***************************************************************************************************************/
/*                                                                                                               */
/*                               Advent of Code 2016 - Solutions of Problems                                     */
/*                                                                                                               */
/*   Author:     Marcel Krause                                                                                   */
/*   Date:       12.01.2021                                                                                      */
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
|         Day 01 - Riddle 02         |
|                                    |
+------------------------------------+
`
console.log(greeting);

// Load the data
var fs = require('fs');
fs.readFile( __dirname + '/Day01-01_input.dat', function (err, data) {
  if (err) {
    throw err; 
  }
  mainProgram(data.toString());
});

// Execute the main program
function mainProgram(data) {
    // Initial conditions: our direction vector points to the north
    var posVector = [0, 1],
        position = [0, 0],
        visitedPositions = [];

    // Iterate over all instructions
    var instructions = data.split(', '),
        phi = 0,
        length = 0,
        walking = [],
        twiceVisited = false;
    for (var x of instructions) {
        length = parseInt(x.substring(1))
        if (x.substring(0, 1) == 'R') {
            phi = -1;
        }
        else {
            phi = 1;
        }
        posVector = [-phi*posVector[1], phi*posVector[0]];
        // walking = posVector.map(x => x*length);
        for (var j=0; j < length; j++) {
            position = posVector.map((a,i) => a + position[i]);

            // Check if we visited the current position before; if yes, then this is the position we are looking for
            for (var savedPos of visitedPositions) {
                if ((savedPos[0] == position[0]) && (savedPos[1] == position[1])) {
                    twiceVisited = true;
                    break;
                }
            }
            visitedPositions.push(position);
            if (twiceVisited) {
                break;
            }
        }
        if (twiceVisited) {
            break;
        }
    }

    // Calculate the Manhattan metric
    var distance = Math.abs(position[0]) + Math.abs(position[1]);

    // Output
    console.log(`The first location we visited twice is ${distance} blocks away.`)
}