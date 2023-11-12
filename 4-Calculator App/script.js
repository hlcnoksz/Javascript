const display = document.getElementsByName('display')[0]

function appendValue(value) {
  display.value += value
}

function clearDisplay() {
  display.value = ''
}

function removeLast() {
  display.value = display.value.slice(0, -1)
}

function calculate() {
  display.value = eval(display.value)
}

function appendOperator(operator) {
  const lastIndex = display.value.slice(-1)

  if (
    lastIndex == '*' ||
    lastIndex == '-' ||
    lastIndex == '/' ||
    lastIndex == '+'
  ) {
    display.value = display.value.toString().slice(0, -1)
    display.value += operator
  } else {
    display.value += operator
  }
}
