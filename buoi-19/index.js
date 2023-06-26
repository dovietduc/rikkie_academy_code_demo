// 1. quy định: 30 phút
// 1. Khai báo function
// 1.1 Tại sao chúng ta cần function
// hàm giúp thực thi một khối mã lệnh khác nhau và bạn có thể truyền tham số

// 1.2 Cách khai báo hàm
function showWellCome(name) {
    // let name = 'duc';
    // body hàm hay thân hàm là nơi chứa các câu lệnh thực thi
    console.log('wellcome ' + name);
}

// 1.3 gọi hàm hay còn gọi thực thi hàm
// truyền vào ở nơi thực thi hàm là value
showWellCome('duc');
showWellCome('duy');
showWellCome('manh');

// 2. Cách khai báo hàm khác
// tạo ra hàm và gán nó cho 1 biến
let showInfo = function (name) {
    console.log('show info ' + name);
}

// thuc thu ham
showInfo([1, 2, 4]);
showInfo('duy');
showInfo('manh');

// đề bài
// viết 1 chương trình bằng hàm thực thi in ra tổng của 2 số a, b
// khai báo hàm
function addNumber(a, b) {
    // log kết quả của a + b
    return a + b;
}

// thực thi hàm
let result = addNumber(5, 6);
console.log('result', result);

// arguments
// hàm nhân nhiều số
function mutiple() {
    // arguments -- cách truy cập value khi gọi hàm mà 
    // không khởi tạo biến chứa value
    // console.log(arguments[0]);
    // console.log(arguments[1]);
    // console.log(arguments[2]);
    let sum = 0;
    for(let i = 0; i < arguments.length; i++) {
        sum = sum + arguments[i];
    }
    return sum;

}

console.log(mutiple(4, 5, 6));
console.log(mutiple(4, 5));
console.log(mutiple(4));
console.log(mutiple(4, 5, 6, 7));


// hàm trả về kết quả nếu true -> vẫn còn
// false -> không còn

// function showMessageForLove(isLove) {
//     let message;
//     if(isLove) {
//         message = 'Em chán anh lắm rồi, chim cút';
//     } else {
//         message = 'Em vẫn còn yêu anh nhiều lắm';
//     }

//     return message;
// }

// gọi hàm
// hàm thông thường cần kết quả trả về;
// showMessageForLove(true) -> value chính là message
// yêu cầu true, false có hàm confirm trả về để nhỡ bạn gái có chọn nhầm
// thì vẫn cho bạn gái cơ hội quay lại
// let isConfirmLove = confirm(
//     `Em chắc chắn muốn chia tay anh chứ, 
//     nếu ok em không còn cơ hội đâu, suy nghĩ kĩ vào`
// );
// let resultMesage = showMessageForLove(isConfirmLove);
// console.log(resultMesage);

// bài 2: Viêt 1 hàm chuyển đổi độ F sang độ C với công thức như sau:
// C = (F– 32) /1.8
// đầu vào của hàm là độ F bất kì

let arrMin = [];

// hàm return -1 nghĩa là []
// khi index = -1 nghĩa mảng []
function getMin(minArr) {

    // giả sử nhỏ nhất ở vị trí 0
    let min = minArr[0];
    // so sánh min với giá trị khác
    for(let i = 1; i < minArr.length; i++) {
        if(minArr[i] < min) {
            min = minArr[i];
        }
    }
    return min;

}

let minArrReturn = -1;
// tra ve min cua mang
if (arrMin.length > 0) {
    let minArrReturn = getMin(arrMin);
    console.log('gia tri min', minArrReturn);
}






