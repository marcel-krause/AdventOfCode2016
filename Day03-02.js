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


/*------------------------*/
/*        Functions       */
/*------------------------*/
// a, b, c: integers. Returns: boolean. Check if the triangle inequality is fulfilled (note that in the puzzle, we do not check for equality since a "valid" triangle is described there as having a strictly larger sum of two sides w.r.t. the third side)
function checkForTriangle(a, b, c) {
    if ( (Math.abs(a - b) < c) && (c < a + b) ) {
        if ( (Math.abs(b - c) < a) && (a < b + c) ) {
            if ( (Math.abs(c - a) < b) && (b < c + a) ) {
                return true;
            }
        }
    }
    return false;
}


/*---------------------------*/
/*        Main Program       */
/*---------------------------*/

var greeting = `+------------------------------------+
|                                    |
|         Advent of Code 2016        |
|         Day 03 - Riddle 02         |
|                                    |
+------------------------------------+
`
console.log(greeting);

// Load the data
var fs = require('fs');
fs.readFile( __dirname + '/Day03-01_input.dat', function (err, data) {
  if (err) {
    throw err; 
  }
  mainProgram(data.toString());
});

// Execute the main program
function mainProgram(data) {
    // Split the instruction lines into separate commands
    var triangleData = data.split(/\r?\n/);

    // Iterate over each line to construct the columns
    var col1 = [], col2 = [], col3 = [];
    for (var line of triangleData) {
        let triangleSides = line.trim().replace(/\s\s+/g, ' ').split(/\s/);
        triangleSides = triangleSides.map(x => parseInt(x));
        col1.push(triangleSides[0]);
        col2.push(triangleSides[1]);
        col3.push(triangleSides[2]);
    }

    // Find the triangle candidates
    var validTriangles = 0;
    for (var i = 0; i < col1.length/3; i++) {
        // Search in column 1
        if(checkForTriangle(col1[3*i], col1[3*i+1], col1[3*i+2])) {
            validTriangles++;
        }

        // Search in column 2
        if(checkForTriangle(col2[3*i], col2[3*i+1], col2[3*i+2])) {
            validTriangles++;
        }

        // Search in column 3
        if(checkForTriangle(col3[3*i], col3[3*i+1], col3[3*i+2])) {
            validTriangles++;
        }
    }
    
    // Output
    console.log(`In the data, there are ${validTriangles} valid triangles.`)
}