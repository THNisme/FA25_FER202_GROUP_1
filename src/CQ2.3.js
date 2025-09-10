//1
const arr = [10, 20, 30];
const [first, second] = arr;
console.log('first =', first);
console.log('second =', second);
//2
const student = { name: "An", age: 20, major: "IT" };
const { name: studentName, age } = student;
console.log('studentName =', studentName);
console.log('age =', age);
//3
function printBookInfo({ title, author, year }) {
    console.log(`title: ${title}`);
    console.log(`author: ${author}`);
    console.log(`year: ${year}`);
}
const book = { title: "hack", author: "TN", year: 2004 };
printBookInfo(book);   