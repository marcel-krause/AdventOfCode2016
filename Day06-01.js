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
|         Day 06 - Riddle 01         |
|                                    |
+------------------------------------+
`
console.log(greeting);

// Load the data
var fs = require('fs');
fs.readFile( __dirname + '/Day06-01_input.dat', function (err, data) {
  if (err) {
    throw err; 
  }
  mainProgram(data.toString());
});

// Execute the main program
function mainProgram(data) {
    // Get the messages
    var messages = data.split(/\r?\n/);

    // Count the letter occurences
    var letterOccurences = [];
    for(let currMess of messages) {
        for (let i = 0; i < currMess.length; i++) {
            // Fill the array in case that it is still empty (at the beginning)
            if (letterOccurences.length == i) {
                letterOccurences.push({});
            }

            // Count the letters
            let currLettOcc = letterOccurences[i];
            let currLetter = currMess.charAt(i);
            if (currLetter in currLettOcc) {
                currLettOcc[currLetter]++;
            }
            else {
                currLettOcc[currLetter] = 1;
            }
            letterOccurences[i] = currLettOcc;
            
        }
    }

    // Find the letter with the maximum occurences in each column
    var mostCommonLetters = '';
    for (let currOcc of letterOccurences) {
        let currLettersCount = [];
        for (let currLetterCount of Object.values(currOcc)) {
            currLettersCount.push(currLetterCount);
        }
        let maxVal = currLettersCount.reduce(function(a, b) {
            return Math.max(a, b);
        });
        mostCommonLetters += getKeysByValue(currOcc, maxVal);
    }
      
    // Output
    console.log(`The error-corrected message is '${mostCommonLetters}'.`)
}