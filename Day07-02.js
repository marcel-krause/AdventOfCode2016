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
|         Day 07 - Riddle 02         |
|                                    |
+------------------------------------+
`
console.log(greeting);

// Load the data
var fs = require('fs');
fs.readFile( __dirname + '/Day07-01_input.dat', function (err, data) {
  if (err) {
    throw err; 
  }
  mainProgram(data.toString());
});

// Execute the main program
function mainProgram(data) {
    // Iterate over the ip addresses
    var validAddresses = 0;
    for(let ipaddresses of data.split(/\r?\n/)) {
        // Remove the hypernet part
        let ipwithouthypernet = ipaddresses.split(/\[\w*\]/g).join('-');
        
        // Find all matches for the subernet part
        var re = /(\w)(\w)\1/g;
        var matches, res = [];
        while (matches = re.exec(ipwithouthypernet)) {
            res.push(matches[0]);
            re.lastIndex = matches.index + 1; // <- Important
        }

        // Iterate over all subernet matches
        let validMatches = [];
        let validMatchesReverse = [];
        for (var matchCandidate of res) {
            if (matchCandidate.charAt(0) != matchCandidate.charAt(1)) {
                if (!validMatches.includes(matchCandidate)) {
                    validMatches.push(matchCandidate);
                    validMatchesReverse.push(matchCandidate.charAt(1) + matchCandidate.substring(0, 2));
                }
            }
        }
        if (validMatches.length == 0) {
            continue;
        }

        // Search for the reverse valid match in the hypernet addresses
        let hypernetMatchFound = false;
        for (let currHypernet of ipaddresses.match(/\[\w*\]/g)) {
            if (hypernetMatchFound) {
                break;
            }
            for (let currValidMatchReverse of validMatchesReverse) {
                if (currHypernet.includes(currValidMatchReverse)) {
                    validAddresses++;
                    hypernetMatchFound = true;
                    break;
                }
            }
        }
        
        
        // if (ipaddresses.match(/\[\w*(\w)(\w)\2\1\w*\]/g) == null) {
        //     // Check for the correct pattern
        //     let ipwithouthypernet = ipaddresses.split(/\[\w*\]/g).join('-');
        //     let ipmatch = ipwithouthypernet.match(/(\w)(\w)\2\1/g);
        //     if (ipmatch != null) {
        //         if (ipmatch[0].charAt(0) != ipmatch[0].charAt(1)) {
        //             validAddresses++;
        //             console.log(ipaddresses);
        //         }
        //     }
        // }
    }
    
    // Output
    console.log(`There are ${validAddresses} valid IP addresses in the list.`)
}