let btnAddTaskElement = document.querySelector('button');
let taskNameElement = document.querySelector('#content');
// localStorage.removeItem('test')
let tasks = getTaskFromLocalStorage()
renderTasks(tasks)

btnAddTaskElement.addEventListener('click', function() {
    //Phần dùng để kiểm tra phần tử Input trong HTML đã có giá trị hay chưa
    if (!taskNameElement.value) {
        alert("Vui Lòng Nhập Tên Công Việc!");
        return false;
    }
    let taskId = this.getAttribute('id')
        //Lấy thộc tính của id mà ta đã chọn
    let tasks = getTaskFromLocalStorage()
        //lấy ra dữ liệu bên trong LocalStorage


    if (taskId == 0 || taskId) {
        tasks[taskId] = {
            name: taskNameElement.value
        };
        this.removeAttribute('id')
    } else {
        tasks.push({
            name: taskNameElement.value
                //lấy giá trị của tasknameElement
        });

    }
    taskNameElement.value = "";
    localStorage.setItem('tasks', JSON.stringify(tasks))
        //trả dữ liệu sang JSON
    renderTasks(tasks)

})


// phưng thức dùng để đưa dữ liệu ra bảng và lấ id về cho sửa và Xóa
function renderTasks(tasks = []) {
    let content = '<ul>';
    tasks.forEach((task, index) => {
        content += `
        <li style="display: flex;   justify-content: space-around">
        <div>${task.name}</div>
        <a href="#" onclick = "editTask(${index})"> Sửa</a>
        <a href="#" onclick = "deleteTask(${index})"> Xóa</a>
    </li>`

    })
    content += '</ul>'
    document.querySelector('#result').innerHTML = content;
}

//
function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ?
        JSON.parse(localStorage.getItem('tasks')) : [];
}

//
function editTask(id) {
    let tasks = getTaskFromLocalStorage()
    if (tasks.length > 0) {
        // alert(tasks[id].name)
        taskNameElement.value = tasks[id].name
        btnAddTaskElement.setAttribute('id', id)
    }
}

//

function deleteTask(id) {
    if (confirm("Bạn Có Muốn Xóa Không?")) {
        let tasks = getTaskFromLocalStorage();
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }
}