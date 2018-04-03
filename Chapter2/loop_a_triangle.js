/*

Chapter 2: Looping A Triangle

Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######

*/

let output_string = "#";

while(output_string.length < 7) {
  console.log(output_string);
  output_string += "#";
}
