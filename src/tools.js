
export const createElement = function(type, className, parentElement) {
    const element = document.createElement(`${type}`);
    element.classList.add(`${className}`);

    if (parentElement) {
        parentElement.appendChild(element);
    }
    return element;
}

export const formatNumberToTally = function(num) {
    let tally = "";
    let remainder = num % 5;
    let fives = 0;

    if (num >= 5) {
        fives = (num - (remainder)) / 5;
    }
    // add a five tally per 5
    for (let i = 0; i < fives; i++) {
        tally += "卌";
    }
            
    for (let i = 0; i < remainder; i++) {
        tally += "|";
    }

    return tally;
}