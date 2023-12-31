// query selector
let btnSelector = document.querySelector('.save_data');
let tbody = document.querySelector('tbody');
let nameSelector = document.querySelector('#name');
let emailSelector = document.querySelector('#email');
let phoneSelector = document.querySelector('#phone');
let addressSelector = document.querySelector('#address');
let sortButton = document.querySelector('.sort_name');
let sortButtonVn = document.querySelector('.sort_name_vn');
let btnSearch = document.querySelector('.btn_search');
let inputSearch = document.querySelector('.search input');


let students = [
    {
        id: crypto.randomUUID(),
        name: 'a',
        email: 'vietduc122@gmail.com',
        phone: '092487777',
        address: 'Thanh Hóa',
        sex: 'Nam'
    },
    {
        id: crypto.randomUUID(),
        name: 'b',
        email: 'vietduc122@gmail.com',
        phone: '092487777',
        address: 'Thanh Hóa',
        sex: 'Nam'
    },
    {
        id: crypto.randomUUID(),
        name: 'c',
        email: 'vietduc122@gmail.com',
        phone: '092487777',
        address: 'Thanh Hóa',
        sex: 'Nam'
    },
    {
        id: crypto.randomUUID(),
        name: 'f',
        email: 'vietduc122@gmail.com',
        phone: '092487777',
        address: 'Thanh Hóa',
        sex: 'Nam'
    }
];


// Hàm này phải thay đổi dựa trên trước hay sau click button
// Hay chúng ta kiểm tra data có trong localStorage hay chưa?
function showListStudent() {

    let studentLocal = localStorage.getItem('studentLocalStorage');
    let studentsInLoop;
    // chưa click thêm sinh viên
    if(studentLocal === null) {
        studentsInLoop = students;
        // lưu data khi chưa click button
        localStorage.setItem('studentLocalStorage', JSON.stringify(students));
    } 
    // đã click thêm sinh viên
    else {
        studentsInLoop = JSON.parse(localStorage.getItem('studentLocalStorage'));
    }

    // 1. Tạo ra mã html từ array data
    let resultHtml = '';
    for (let i = 0; i < studentsInLoop.length; i++) {
        let student = studentsInLoop[i];
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
            if (students[i].id === idUpdate) {
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
        let students = JSON.parse(localStorage.getItem('studentLocalStorage'));
        // 2. đưa giá trị input vào object, sau đó push vào mảng students
        let objStudentAdd = {
            id: crypto.randomUUID(),
            name: name,
            email: email,
            address: address,
            phone: phone,
            sex: sex
        };
        // 3. Tạo dữ liệu html dựa vào value input (tr)
        students.push(objStudentAdd)

        // 3.5 lưu data vào localStorage
        localStorage.setItem('studentLocalStorage', JSON.stringify(students));

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
            
            // lấy data studens từ localStorage
            let students = JSON.parse(localStorage.getItem('studentLocalStorage'));
            console.log(students);

            // 1. lấy id delte
            let idDelete = clicked.getAttribute('data-id');
            // 2. tìm index
            let indexDelete;
            for (let i = 0; i < students.length; i++) {
                if (students[i].id === idDelete) {
                    indexDelete = i;
                    break;
                }
            }
            console.log('indexDelete', indexDelete);

            // 3. xóa theo index
            students.splice(indexDelete, 1);
            
            // 3.5 cập nhật lại localStorage phần tử đã xóa
            localStorage.setItem('studentLocalStorage', JSON.stringify(students));

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
            if (students[i].id === idEdit) {
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

// tiếng anh end sort
function handleSortStudent() {
    students.sort(
        function(a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(nameA < nameB) {
                return -1;
            }
            if(nameA > nameB) {
                return 1;
            }
            return 0;
        }
    )
    showListStudent();
}

// tiếng việt
function handleSortStudentVn() {
    students.sort(
        function(a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(nameA.localeCompare(nameB) < 0) {
                return -1;
            }
            if(nameA.localeCompare(nameB) > 0) {
                return 1;
            }
            return 0;
        }
    );
    showListStudent();
}

// tìm kiếm dữ liệu
function handleSearch() {
    let valueSearch = inputSearch.value.toLowerCase();
    console.log(valueSearch);
    // 1. Tìm ra item filter thỏa mãn
    let studentFilter = students.filter(
        function(studentItem) {
            return studentItem.name.toLowerCase().indexOf(valueSearch) !== -1;
        }
    );
    // 2. render data
    let resultHtml = '';
    for (let i = 0; i < studentFilter.length; i++) {
        let student = studentFilter[i];
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


// Tạo các sự kiện cho element
// Hiển thị danh sách student
showListStudent();
btnSelector.addEventListener('click', handleAddStudent);
// thêm sự kiện xóa, edit
tbody.addEventListener('click', handleProcessStudent);
// thêm sự kiện cho sort button
sortButton.addEventListener('click', handleSortStudent);
// thêm sự kiện cho sort tiếng việt
sortButtonVn.addEventListener('click', handleSortStudentVn);
// thêm sự kiện cho search
btnSearch.addEventListener('click', handleSearch);
// Thêm sự kiện nhập trong ô input thì cũng chạy hàm này
inputSearch.addEventListener('keyup', handleSearch);