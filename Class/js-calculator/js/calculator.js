// ==========================================
// 1. UI SELECTORS
// ==========================================
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');

// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS 
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
const add = (a,b) => { return a+b; }

// TODO: Write "subtract" callback expression (a, b) => ...
const subtract = (a,b) => { return a-b; }


// TODO: Write "multiply" callback expression (a, b) => ...
const multiply = (a,b) => { return a*b; }


// TODO: Write "divide" callback expression (a, b) => ...
// Rule: Guard against division-by-zero! Return an Error or string warning.
const divide = (a,b) => { 
    try {
        return a/b;
    } catch(error){
        return -1;
    }
}



// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE 
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)
const calculator = (numA, numB, callback) => {
    return callback(numA, numB);
}


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING 
// ==========================================
calculateBtn.addEventListener('click', () => {
    try { 
    //alert('click');
    // TODO: Extract values from the inputs and parse them as floats.
    const valA = parseFloat(num1Input.value);
    const valB = parseFloat(num2Input.value);
    // TODO: Retrieve the selected operation string value.
    const oper = operationSelect.value;
    if (num1Input.value === "" || num2Input.value === "") {
        throw new Error("Introduce a number")
    }
    if(!oper) {
        throw new Error("Introduce an operation");
    }
    if (isNaN(valA) || isNaN(valB)) {
            throw new Error("Introduce valid numbers");
        }
    // TODO: Match the selected operation string to its corresponding function reference.
    let targetCallback;
    switch(oper) {
        case "add" : targetCallback = add; break;
        case "subtract" : targetCallback = subtract; break;
        case "multiply" : targetCallback = multiply; break;
        case "divide" : targetCallback = divide; break;
        default : throw new Error("Operation not defined");
    }

    // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
    const res = calculator(valA, valB, targetCallback);

    // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
    resultStatus.className = "alert alert-success text-center";
    resultStatus.textContent = `Result: ${res}` ;
} catch(error) {
    resultStatus.className = "alert alert-danger text-center";
    resultStatus.textContent = `Error: ${error.message}` ;
}

});