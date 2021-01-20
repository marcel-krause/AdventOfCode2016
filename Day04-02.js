 /***************************************************************************************************************/
/*                                                                                                               */
/*                               Advent of Code 2016 - Solutions of Problems                                     */
/*                                                                                                               */
/*   Author:     Marcel Krause                                                                                   */
/*   Date:       20.01.2021                                                                                      */
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
// function getKeysByValue(obj, val)
// obj: Object; val: integer
// return: Array
// Searches for the value val in the Object obj and returns a list of keys which have the value val.
function getKeysByValue(obj, val) {
    return Object.keys(obj).filter(key => obj[key] === val);
}


/*---------------------------*/
/*        Main Program       */
/*---------------------------*/

var greeting = `+------------------------------------+
|                                    |
|         Advent of Code 2016        |
|         Day 04 - Riddle 02         |
|                                    |
+------------------------------------+
`
console.log(greeting);

// Load the data
var fs = require('fs');
fs.readFile( __dirname + '/Day04-01_input.dat', function (err, data) {
  if (err) {
    throw err; 
  }
  mainProgram(data.toString());
});

// Execute the main program
var unicodeOffset = 'a'.charCodeAt(0);
function mainProgram(data) {
    // Split the instruction lines into separate commands
    var allRooms = data.split(/\r?\n/);
    
    // Iterate over all rooms
    var allDecryptedNames = '',
        northpoleSectorId;
    for (let currRoom of allRooms) {
        // Throw away the hyphen and combine all letters to one word
        let currRoomName = '';
        for (let currWord of currRoom.match(/\w+-/g)) {
            currRoomName += currWord.replace('-', ' ');
        }
        
        // Get the sector id
        let sectorId = parseInt(currRoom.match(/\d+/g)[0]);
        
        // Iterate over all letters in the word and shift them according to the sector id
        var decryptedRoomName = '';
        for (let i = 0; i < currRoomName.length; i++) {
            let currChar = currRoomName.charAt(i);
            if (currChar == ' ') {
                decryptedRoomName += currChar;
                continue;
            }

            // Convert the char to its unicode code, apply the offset and shift
            decryptedRoomName += String.fromCharCode((currChar.charCodeAt(0) - unicodeOffset + sectorId)%26 + unicodeOffset);
        }
        allDecryptedNames += decryptedRoomName + '\n';

        // Search for the north pole string
        if (decryptedRoomName.includes('north') && decryptedRoomName.includes('pole')) {
            northpoleSectorId = sectorId;
        }
    }

    // Save the results in a file
    fs.writeFile( __dirname + '/Day04-01_decrypted.dat', allDecryptedNames, function (err) {
        if (err) return console.log(err);
      });
    
    // Output
    console.log(`The sector ID of the room where north pole objects are stored is ${northpoleSectorId}.`)
}