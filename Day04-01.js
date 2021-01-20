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
|         Day 04 - Riddle 01         |
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
function mainProgram(data) {
    // Split the instruction lines into separate commands
    var allRooms = data.split(/\r?\n/);
    
    // Iterate over all rooms
    var sumOfIds = 0;
    for (let currRoom of allRooms) {
        // Throw away the hyphen and combine all letters to one word
        let currRoomName = '';
        for (let currWord of currRoom.match(/\w+-/g)) {
            currRoomName += currWord.replace('-', '');
        }

        // Get the checksum
        let checksum = currRoom.match(/\[\w+\]/g)[0].replace(/\[|\]/g, '');
        
        // Get the sector id
        let sectorId = parseInt(currRoom.match(/\d+/g)[0]);
        
        // Iterate over all letters in the word and count them
        letterCount = {};
        for (let i = 0; i < currRoomName.length; i++) {
            let currChar = currRoomName.charAt(i);
            if (currChar in letterCount) {
                letterCount[currChar]++;
            }
            else {
                letterCount[currChar] = 1;
            }
        }
        let letterValues = Object.values(letterCount);
        letterValues.sort((a, b) => b-a);

        // Find the top 5 letters
        var topFiveLetters = '';
        for (let currLet of letterValues) {
            let topLet = getKeysByValue(letterCount, currLet);
            if (topFiveLetters.includes(topLet[0])) {
                continue;
            }
            topLet.sort();
            topFiveLetters += topLet.join('');
            if (topFiveLetters.length >= 5) {
                break;
            }
        }
        if (topFiveLetters.length > 5) {
            topFiveLetters = topFiveLetters.substring(0, 5);
        }

        // If the top five letters are the same as the checksum, add the sector id
        if (topFiveLetters == checksum) {
            sumOfIds += sectorId;
        }
    }
    
    // Output
    console.log(`The sum of the sector IDs of all valid rooms is given by ${sumOfIds}.`)
}