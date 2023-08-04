const { set } = require("date-fns");

let fun = () => {
    const c = 5;
    return new Promise((theny, catchy) => {
        setTimeout(() => {
            if (c == 5) {
                catchy("error");
            }
            theny("Hello");
        }, 1000);
    });
};

let fun2 = async () => {
    try {
        let res = await fun();
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};
console.log("world");

const wait = (count) => {
    return new Promise((theny, catchy) => {
        setTimeout(() => {
            if (count == 0) catchy("error");
            theny(count);
        }, 1000);
    });
};
const func = async () => {
    const res = await wait(1);
    console.log(1);
    await wait(2);
    console.log(2);
    console.log(res);
};

func();
