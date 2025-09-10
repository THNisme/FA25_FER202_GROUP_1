//Q1
const myPromise = new Promise((resolve, reject) => {
    const isLoggedIn = true;
    //Q3
    setTimeout(()=>{
    if (isLoggedIn) {
        resolve("Welcome!");
    } else {
        reject("Access denied!");
    }
},2000);
});

//Q2
myPromise
    .then(message => console.log(message))
    .catch(error => console.log(error));





