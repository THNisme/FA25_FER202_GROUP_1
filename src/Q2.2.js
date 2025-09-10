//Tạo chuỗi chào mừng: "Xin chào, tôi tên là [tên], năm nay [tuổi] tuổi." dùng template literals.
let myName = `Nghĩa`;
let age = 20;

let welcome = `Xin chào, tôi tên là ${myName}, năm nay ${age}`;

console.log(welcome);

// Viết một function nhận vào tên sản phẩm, giá, và in ra:
// Sản phẩm: Laptop
// Giá: 15,000,000 VNĐ

const productInfor = (pName, pCost) => {
    let message = 
    `
        Sản phẩm: ${pName}
        Giá: ${pCost}
    `

    console.log(message);
};

productInfor(`Laptop`, `15,000,000 VNĐ`);

//Tạo chuỗi nhiều dòng (multi-line string) để hiển thị một đoạn thơ ngắn.
let paragraph = 
`
Câu thơ ngắn, cuộc đời dài

Đêm qua tôi chạy ra ngoài chiêm bao

Và em, em tự thuở nào

Gọi tôi trong những thì thào đêm mưa

Trên đầu rực ánh nắng trưa

Con thuyền thương nhớ cũng vừa sang ngang

Rồi từ cõi ấy mênh mang

Lòng tôi nở một đóa vàng tương tư
`;

console.log(paragraph);