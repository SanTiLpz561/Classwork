/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  var calledFromDOM = false;
  if (typeof n !== "number") {
    n = parseInt(document.getElementById("num").value, 10);
    calledFromDOM = true;
  }

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i,
    sequence = [];

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  if (!isNaN(n) && n > 1) {
    for (i = 2; i <= n; i++) {
      if (n % i === 0 && isPrime(i)) {
        sequence.push(i);
      }
    }
  }

  if (calledFromDOM) {
    document.getElementById("pf").textContent = sequence.join(", ");
  }

  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
//console.log(getPrimeFactors(30030));