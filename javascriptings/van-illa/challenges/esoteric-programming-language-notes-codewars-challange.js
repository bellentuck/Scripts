class Interpreter {
  constructor() {
    this.accumulator = 0;
    this.step = 0;
    this.ascii = false;
    this.debug = [ ];
    this.output = "";
    // // a - Increment the accumulator
    // set increment() {
    //   this.accumulator++;
    // }
    // // b - Decrement the accumulator
    // set decrement() {
    //   this.accumulator--;
    // }
    // // c - Output the accumulator
    // // If ascii=true, print accumulator as ascii character.
    // set output() {
    //   this.ascii
    //     ? this.output.concat(String.fromCharCode(this.accumulator))
    //     : this.output.concat(this.accumulator.toString());
    // }
    //
    // // d - Invert accumulator
    // set invert() {
    //   this.accumulator =- this.accumulator;
    // }
    // // r - Set accumulator to random no. (btwn 0-accumulator)
    // set random() {
    //   this.accumulator = Math.floor(
    //     (Math.random() * this.accumulator)
    //     + 0);
    // }
    // // n - Set accumulator to 0
    // set zero() {
    //   this.accumulator = 0;
    // }
    // // $ - Toggle ASCII output mode.
    // set ascii() {
    //   this.ascii = !this.ascii;
    // }
    // // l - Loop back to the beginning of the program.
    // // Accumulator and ASCII mode does not reset.
    // set loop() {
    //   this.step = 0;
    // }
    // // ; - Debug.
    // // Prints out accumulator as a number and ascii character.
    // set debug() {
    //   this.debug.push(
    //   this.accumulator
    //   + "->"
    //   + String.fromCharCode(this.accumulator)
    //   );
    //}
  };
  read(input) {
    for (this.step; this.step<input.length; this.step++) {
      switch (input[this.step]) {
        // a - Increment the accumulator
        case "a":
          this.increment();
          break;
        // b - Decrement the accumulator
        case "b":
          this.decrement();
          break;
        // c - Output the accumulator
        // If ascii=true, print accumulator as ascii character.
        case "c":
          this.out();
          break;
        // d - Invert accumulator
        case "d":
          this.invert();
          break;
        // r - Set accumulator to random no. (btwn 0-accumulator)
        case "r":
          this.random();
          break;
        // n - Set accumulator to 0
        case "n":
          this.zero();
          break;
        // $ - Toggle ASCII output mode.
        case "$":
          this.asciify();
          break;
        // l - Loop back to the beginning of the program.
        // Accumulator and ASCII mode does not reset.
        case "l":
          this.loop();
          break;
        // ; - Debug.
        // Prints out accumulator as a number and ascii character.
        case ";":
          this.debugger();
          break;
        default:
          console.log("Error: not a viable input command.");
      }
    }
    this.step = 0;
    return this;
  };
};


// a - Increment the accumulator
Interpreter.prototype.increment = function() {
  this.accumulator++;
};

// b - Decrement the accumulator
Interpreter.prototype.decrement = function() {
  this.accumulator--;
};

// c - Output the accumulator
// If ascii=true, print accumulator as ascii character.
Interpreter.prototype.out = function() {
  this.output = this.ascii ?
    String.fromCharCode(this.output.concat(this.accumulator.toString()))
    : this.output.concat(this.accumulator.toString());
};
// Interpreter.prototype.out = function() {
//   this.output = this.output.concat(this.accumulator.toString());
//   if (this.ascii) {
//     this.output = String.fromCharCode(this.output);
//   }
// };


// d - Invert accumulator
Interpreter.prototype.invert = function() {
  this.accumulator =- this.accumulator;
};

// r - Set accumulator to random no. (btwn 0-accumulator)
Interpreter.prototype.random = function() {
  this.accumulator =
    Math.floor((Math.random() * this.accumulator)
    + 0);
};

// n - Set accumulator to 0
Interpreter.prototype.zero = function() {
  this.accumulator = 0;
};

// $ - Toggle ASCII output mode.
Interpreter.prototype.asciify = function() {
  this.ascii = !this.ascii;
};

// l - Loop back to the beginning of the program.
// Accumulator and ASCII mode does not reset.
Interpreter.prototype.loop = function() {
  this.step = 0;
};

// ; - Debug.
// Prints out accumulator as a number and ascii character.
Interpreter.prototype.debugger = function() {
  this.debug = this.debug.push(
    this.accumulator
    + "->"
    + String.fromCharCode(this.accumulator)
  );
};
