 /***************************************************************************************************************/
/*                                                                                                               */
/*                               Advent of Code 2016 - Solutions of Problems                                     */
/*                                                                                                               */
/*   Author:     Marcel Krause                                                                                   */
/*   Date:       19.01.2021                                                                                      */
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
|         Day 05 - Riddle 02         |
|                                    |
+------------------------------------+
`
console.log(greeting);

// Load the data
var fs = require('fs');
fs.readFile( __dirname + '/Day05-01_input.dat', function (err, data) {
  if (err) {
    throw err; 
  }
  mainProgram(data.toString());
});

// Execute the main program
function mainProgram(data) {
    // Load the md5 module
    var md5 = require('blueimp-md5');

    // Get the room ID
    var roomId = data.split(/\r?\n/)[0],
        roomIdGen;

    // Generate the password
    var password = ['_', '_', '_', '_', '_', '_', '_', '_'],
        iterations = 0,
        i = 0;

    // Add some fancy text
    console.log(`Decrypting the password for the room ${roomId} ...`);
    console.log(`${password.join(' ')}`);

    // "Decrypt" the password
    while (true) {
        // Generate the next word to be hashed
        roomIdGen = roomId + i.toString();

        // Check if the first five characters of the hash are all zeros
        var hash = md5(roomIdGen);
        if (hash.substr(0, 5) == '00000') {
            // Check if the sixth character is a number between 0 and 7
            var charAtNextPos = hash.substr(5,1);
            if (!isNaN(charAtNextPos)) {
                if (password[charAtNextPos] == '_') {
                    password[charAtNextPos] = hash.substr(6, 1);
                    iterations++;
                    console.log(`${password.join(' ')}`);
                }
            }
        }

        if (iterations > 7) {
            break;
        }
        i++;
    }
    password = password.join('');
      
    // Output
    console.log(`\nThe room's password is ${password}.`);
}