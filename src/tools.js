
export const createElement = function(type, className, parentElement) {
    const element = document.createElement(`${type}`);
    element.classList.add(`${className}`);

    if (parentElement) {
        parentElement.appendChild(element);
    }
    return element;
}
