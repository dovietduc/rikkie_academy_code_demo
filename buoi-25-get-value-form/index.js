// query selector
let btnSelector = document.querySelector('.save_data');
let tbody = document.querySelector('tbody');
let nameSelector = document.querySelector('#name');
let emailSelector = document.querySelector('#email');
let phoneSelector = document.querySelector('#phone');
let addressSelector = document.querySelector('#address');


let students = [
    {
        id: 1,
        name: 'Đức Đỗ',
        email: 'vietduc122@gmail.com',
        phone: '092487777',
        address: 'Thanh Hóa',
        sex: 'Nam'
    },
    {
        id: 2,
        name: 'Đức Đỗ 2',
        email: 'vietduc122@gmail.com',
        phone: '092487777',
        address: 'Thanh Hóa',
        sex: 'Nam'
    }
];


function showListStudent() {
    // 1. Tạo ra mã html từ array data
    let resultHtml = '';
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        resultHtml = resultHtml + ` <tr>
                <td>${i + 1}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.address}</td>
                <td>${student.sex}</td>
                <td>
                    <button type="button" data-id="${student.id}" class="btn btn-blue">Edit</button>
                    <button type="button" data-id="${student.id}" class="btn btn-danger">Delete</button>
                </td>
            </tr>`
    }
    // 2. Đưa html vào trong tbody
    tbody.innerHTML = resultHtml;
}

// 2. thêm sinh viên
function handleAddStudent(event) {
    // event.preventDefault();
    // 1. Lấy value input
    let name = nameSelector.value;
    let email = emailSelector.value;
    let address = addressSelector.value;
    let phone = phoneSelector.value;
    let sex = document.querySelector('.sex_choose:checked').value;

    if (event.target.classList.contains('update')) {
        // 2.update lấy ra id update
        let idUpdate = event.target.getAttribute('data-id');
        // 3. lấy ra index object update
        let indexEdit;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === +idUpdate) {
                indexEdit = i;
                break;
            }
        }
        // 4. cập nhật các trường trong student theo giá trị lấy được trong form
        students[indexEdit].name = name;
        students[indexEdit].email = email;
        students[indexEdit].address = address;
        students[indexEdit].phone = phone;
        students[indexEdit].sex = sex;
        // 5. Hiển thị lại dữ liệu students
        showListStudent();
        // 6. Reset form đến trạng thái add
        document.querySelector('form').reset();
        // 7. reset button update to add
        btnSelector.classList.remove('update');
        btnSelector.removeAttribute('data-id');
        btnSelector.innerText = 'Lưu Lại';


    } else {
        document.querySelector('.styled-table').classList.remove('hide');
        document.querySelector('.list_header').innerText = 'Danh sách sinh viên';
        // 2. đưa giá trị input vào object, sau đó push vào mảng students
        let objStudentAdd = {
            id: Date.now(),
            name: name,
            email: email,
            address: address,
            phone: phone,
            sex: sex
        };
        // 3. Tạo dữ liệu html dựa vào value input (tr)
        students.push(objStudentAdd)
        // 4. chèn tr vào trong body (render lại dữ liệu)
        showListStudent();
    }


}

function handleProcessStudent(event) {
    let clicked = event.target;
    if (clicked.classList.contains('btn-danger')) {
        let confirmDelete = confirm('Bạn chắc chắn muốn xóa không ?');

        if (confirmDelete) {
            // delete data
            // 1. lấy id delte
            let idDelete = clicked.getAttribute('data-id');
            // 2. tìm index
            let indexDelete;
            for (let i = 0; i < students.length; i++) {
                if (students[i].id === +idDelete) {
                    indexDelete = i;
                    break;
                }
            }
            // 3. xóa theo index
            students.splice(indexDelete, 1);
            if (students.length === 0) {
                document.querySelector('.styled-table').classList.add('hide');
                document.querySelector('.list_header').innerText = 'Danh sách trống';
            }

            // 4. chèn tr vào trong body (render lại dữ liệu)
            showListStudent();
            // 6. Reset form đến trạng thái add
            document.querySelector('form').reset();
            // 7. reset button update to add
            btnSelector.classList.remove('update');
            btnSelector.removeAttribute('data-id');
            btnSelector.innerText = 'Lưu Lại';
        }


    } else if (clicked.classList.contains('btn-blue')) {
        // show value update to form
        // 1. lấy id edit
        let idEdit = clicked.getAttribute('data-id');
        // 2. tìm index
        let indexEdit;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === +idEdit) {
                indexEdit = i;
                break;
            }
        }
        // 3. lấy ra object cần chỉnh sửa
        let objEdit = students[indexEdit];
        // 4. set checked
        nameSelector.value = objEdit.name;
        emailSelector.value = objEdit.email;
        phoneSelector.value = objEdit.phone;
        addressSelector.value = objEdit.address;
        document.querySelector(`input[value=${objEdit.sex}]`).checked = true;

        // 5. Thêm trạng thái cho nút submit để phân biệt add hay update
        btnSelector.classList.add('update');
        btnSelector.setAttribute('data-id', idEdit);
        btnSelector.innerText = 'Update';


    }
}


// Tạo các sự kiện cho element
// Hiển thị danh sách student
showListStudent();
btnSelector.addEventListener('click', handleAddStudent);
// thêm sự kiện xóa, edit
tbody.addEventListener('click', handleProcessStudent);
