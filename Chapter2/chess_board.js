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
