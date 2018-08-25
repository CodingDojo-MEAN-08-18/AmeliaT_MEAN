module.exports = function (){
    return {
      add: function(num1, num2) { 
        console.log(`${num1} + ${num2} =`,num1+num2);
      },
      multiply: function(num1, num2) {
           console.log(`${num1} x ${num2} =`,num1*num2);
      },
      square: function(num) {
        console.log(`${num}x${num} =`, num*num);
      },
      random: function(num1, num2) {
          if (num1<num2){
            console.log(`Random number between ${num1} & ${num2} =`, Math.floor(Math.random()*(num2-num1+1)+num1));
          }
          else{
            console.log(`Random number between ${num2} & ${num1} =`, Math.floor(Math.random()*(num1-num2+1)+num2));
          }
      }
    }
  };