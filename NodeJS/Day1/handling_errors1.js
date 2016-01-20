function divideNumbers(x, y) {

    try {
        if (y === 0) {
            throw "Can't divide with zero.";
        } else {
            return x / y;
        }
    } catch (Exception) {
        return Exception;
    }
}

console.log(divideNumbers(5, 2));
console.log(divideNumbers(2, 7));
console.log(divideNumbers(2, -7));
console.log(divideNumbers(-12, -7));
console.log(divideNumbers(-14, 7));
console.log(divideNumbers(14, 0));
