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
|         Day 07 - Riddle 01         |
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
        // Sort out hypernet matches
        if (ipaddresses.match(/\[\w*(\w)(\w)\2\1\w*\]/g) == null) {
            // Check for the correct pattern
            let ipwithouthypernet = ipaddresses.split(/\[\w*\]/g).join('-');
            let ipmatch = ipwithouthypernet.match(/(\w)(\w)\2\1/g);
            if (ipmatch != null) {
                if (ipmatch[0].charAt(0) != ipmatch[0].charAt(1)) {
                    validAddresses++;
                }
            }
        }
    }
    
    // Output
    console.log(`There are ${validAddresses} valid IP addresses in the list.`)
}