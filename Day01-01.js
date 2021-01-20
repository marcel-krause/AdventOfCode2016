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
|         Day 01 - Riddle 01         |
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
        position = [0, 0];

    // Iterate over all instructions
    var instructions = data.split(', '),
        phi = 0,
        length = 0,
        walking = [];
    for (var x of instructions) {
        length = parseInt(x.substring(1))
        if (x.substring(0, 1) == 'R') {
            phi = -1;
        }
        else {
            phi = 1;
        }
        posVector = [-phi*posVector[1], phi*posVector[0]];
        walking = posVector.map(x => x*length);
        position = walking.map((a,i) => a + position[i]);
    }

    // Calculate the Manhattan metric
    var distance = Math.abs(position[0]) + Math.abs(position[1]);

    // Output
    console.log(`Easter Bunny HQ is ${distance} blocks away.`)
}