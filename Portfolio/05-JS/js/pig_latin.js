/*
Pig Latin
*/

function igpayAtinlay(str) {
  if (!str) return "";
  
  // TODO: initialize the word array by splitting the input string by spaces
  var returnArray = [],
      wordArray = str.split(" ");

  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    if (word.length === 0) continue;
    
    var beginning = word.charAt(0);
    // TODO: make sure that the output is being properly built to produce the desired result.


    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way");
      continue;
    }

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }
    
    var restOfWord = word.substring(beginning.length);
    returnArray.push(restOfWord + beginning + "ay");
  }
  
  return returnArray.join(" ");
}

function displayTranslation() {
  var input = document.getElementById("txtVal").value;
  var outputSpan = document.getElementById("pigLatLbl");
  outputSpan.textContent = igpayAtinlay(input);
}