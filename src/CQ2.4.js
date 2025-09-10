
//Q1
function greet(name = "Khách") {
    console.log(`Xin chào, ${name}!`);
}
greet(); // Output: Xin chào, Khách!


//Q2
function multiply(a, b = 2) {
    return a * b;

}
console.log("nhan 2 so: ");
console.log(multiply(5)); // Output: 10
console.log(multiply(5, 3)); // Output: 15

//Q3
function calculateArea(width, height = width) {
    return width * height;

}
console.log("dien tich hinh vuong: ");
console.log(calculateArea(4)); // Output: 16
console.log(calculateArea(4, 5)); // Output: 20
