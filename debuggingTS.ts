
//1.
var myString: string;
// I can assign myString like this:
myString = "Bee stinger";
//Changed value to string
myString = "9";

//2.
function sayHello(name: string){
    return `Hello, ${name}!`;
 }
 // This is working great:
 console.log(sayHello("Kermit"));
 // Changed argument to string
 console.log(sayHello("9"));

 //3.
 function fullName(firstName: string, lastName: string, middleName?: string){
    if (middleName !== undefined) {
        return `${firstName} ${middleName} ${lastName}`;
    } 
    return `${firstName} ${lastName}`;
}

// This works:
console.log(fullName("Mary", "Moore", "Tyler"));
//Modified optional arguments and conditional statement to work for 2 arguments
console.log(fullName("Jimbo", "Jones"));


// 4. 
interface Student {
    firstName: string;
    lastName: string;
    belts: number;
 }
 function graduate(ninja: Student){
    return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
 }
 const christine = {
    firstName: "Christine",
    lastName: "Yang",
    belts: 2
 }
 const jay = {
    firstName: "Jay",
    lastName: "Patel",
    //original had a typo - belt
    belts: 4
 }
 console.log(graduate(christine));
 // FIX:  no other fixes required
 console.log(graduate(jay));

 //5.
 class Ninja {
    fullName: string;
    constructor(
       public firstName: string,
       public lastName: string){
          this.fullName = `${firstName} ${lastName}`;
       }
    debug(){
       console.log("Console.log() is my friend.")
    }
 }
 // Fixed new Ninja:
 const shane = new Ninja("Shane", "McGee");
 // Modified turing:
 const turing = new Ninja("Alan", "Turing");
 
 // Now I'll make a study function, which is a lot like our graduate function from above:
 function study(programmer: Ninja){
    return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
 }
 // Now this has problems:
 console.log(study(turing));

 //6.
 var increment = function (x) { return x + 1; };
// This works great:
console.log(increment(3));
var square = function (x) { return x * x; };
// This is not showing me what I want:
console.log(square(4));
// This needed brackets
var multiply = function (x, y) { return x * y; };
// This should be a function
var math = function (x, y) {
    var sum = x + y;
    var product = x * y;
    var difference = Math.abs(x - y);
    return [sum, product, difference];
};
console.log(math(3, 5));

//7.
class Elephant {
    constructor(public age: number){}
    //use arrow function to replace previous function and use incoming parameter
    birthday = () => {
        this.age++;
    }
}
 const babar = new Elephant(8);
 setTimeout(babar.birthday, 1000)
 setTimeout(function(){
    console.log(`Babar's age is ${babar.age}.`)
    }, 2000);
