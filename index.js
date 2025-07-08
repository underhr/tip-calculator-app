let billInput = document.getElementById('billInput');
let customTip = document.getElementById('customTip');
let numberPeople = document.getElementById('numberPeople');
let tipAmount = document.getElementById('tipAmount');
let total = document.getElementById('total');
let reset = document.getElementById('reset');

document.addEventListener('input', function calculate(event) {
    if (event.target.matches('#billInput, #customTip, #numberPeople')) {
        updateCalculation();
        checkReset();
    }
});

/* Tip Selection */
const tipGrid = document.getElementById('tipGrid');
let selectedTip = 0;

tipGrid.addEventListener('click', function (event) {
    if (event.target.tagName === 'DIV' && event.target.id !== "tipGrid") {
        [...tipGrid.children].forEach(child => child.classList.remove('activeTip'));
        event.target.classList.add('activeTip');
        selectedTip = parseInt(event.target.textContent) || 0;
        customTip.value = ''; // Clear custom tip when a preset tip is selected
        updateCalculation();
    }
});

/* Custom Tip Input */
document.getElementById("customTip").addEventListener("input", function (event) {
    selectedTip = parseFloat(event.target.value) || 0;
    [...tipGrid.children].forEach(child => child.classList.remove('activeTip')); // Remove active tip highlight
    updateCalculation();
    checkReset();
});

/* Calculation Function */
function updateCalculation() {
    const bill = parseFloat(billInput.value) || 0;
    const tip = selectedTip || 0;
    const people = parseInt(numberPeople.value) || 1; // Ensure at least 1 person
    const tipValue = ((bill * (tip / 100)) / people).toFixed(2);
    tipAmount.innerHTML = '$' + tipValue;
    const totalPerPerson = ((bill / people) + parseFloat(tipValue)).toFixed(2);
    total.innerHTML = '$' + totalPerPerson;
}

/* Reset Button Color */
function checkReset() {
    const billHasValue = billInput.value.trim().length > 0;
    const peopleHasValue = numberPeople.value.trim().length > 0;

    if (billHasValue || peopleHasValue) {
      reset.classList.add('readyReset');
    } else {
      reset.classList.remove('readyReset');
    }
}

  billInput.addEventListener('input', checkReset);
  numberPeople.addEventListener('input', checkReset);

  checkReset();

/* Reset Function */
    reset.addEventListener('click', function () {
    billInput.value = '';
    customTip.value = '';
    numberPeople.value = '';
    selectedTip = 0;
    tipAmount.innerHTML = '$0.00';
    total.innerHTML = '$0.00';

    [...tipGrid.children].forEach(child => child.classList.remove('activeTip')); // Clear tip selection

    checkReset();
});