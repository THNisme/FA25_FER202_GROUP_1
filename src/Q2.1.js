//2.1.1.Viết một hàm tính bình phương của một số, dùng arrow function.
let sqr = num => {
    return num*num;
};
console.log(sqr(4));

// //2.1.2.Viết arrow function trả về số lớn hơn trong hai số.
let biger = (a,b)=>{
    if(a>b){
        return a;
    } else { 
        return b;
    }
};
console.log(biger(4,2));

// //2.1.3.Cho mảng [1,2,3,4,5], dùng map với arrow function để trả về mảng bình phương của các phần tử.
const Arr = [1,2,3,4,5];
const sqrArray = Arr.map(x => x * x);
console.log(sqrArray);