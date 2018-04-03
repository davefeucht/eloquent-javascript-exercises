/*

Chapter 2: Chess Board

Write a program that creates a string that represents an 8×8 grid, using newline characters 
to separate lines. At each position of the grid there is either a space or a "#" character. 
The characters should form a chess board.

Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #

When you have a program that generates this pattern, define a binding size = 8 and change 
the program so that it works for any size, outputting a grid of the given width and height.

*/

let x_counter = 0;
let y_counter = 0;
let output_string = "";
let number_of_rows = 8;

while(y_counter < number_of_rows) {
  while(x_counter < number_of_rows) {
    if(x_counter % 2 === 0) {
      output_string += (y_counter % 2 === 0 ? " " : "#"); 
    }
    else {
      output_string += (y_counter % 2 > 0 ? " " : "#");
    }
    x_counter++;
  }
  output_string += "\n";
  x_counter = 0;
  y_counter++;
}

console.log(output_string);
