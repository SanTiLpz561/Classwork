/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btn");
  
  btn.addEventListener("click", function () {
    const numInput = parseInt(document.getElementById("num").value, 10);
    const primesContainer = document.getElementById("primes");
    
    if (isNaN(numInput) || numInput < 2) {
      primesContainer.textContent = "Por favor ingresa un número mayor o igual a 2.";
      return;
    }

    const result = sieve(numInput);
    primesContainer.textContent = result.join(", ");
  });
});

var sieve = function (n) {
  "use strict";

  var array = [],
    primes = [],
    i,
    j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  
  for (i = 0; i <= n; i++) {
    array.push(true);
  }

  array[0] = false;
  array[1] = false;

  for (i = 2; i <= Math.sqrt(n); i++) {
    if (array[i]) {
      for (j = i * i; j <= n; j += i) {
        array[j] = false;
      }
    }
  }

  for (i = 2; i <= n; i++) {
    if (array[i]) {
      primes.push(i);
    }
  }

  return primes;
};