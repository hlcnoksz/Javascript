//^ Tüm Elementleri Seçmek 
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

//^ Olayların Burda işlendiği fonksiyon
runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageloaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup", filter);
}


//^ Sayfa yüklendiğindeki fonksiyon
function pageloaded() {
    checkTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

//^ İnputun değeri alınır ve gerekli fonksiyonlarda işlemlerin yapılması fonksiyonu
function addTodo(e) {
    const inputText = addInput.value;
    if(inputText == null || inputText == "") {
        showAlert("warning", "Lütfen boş bırakmayınız!");
    }else {
        //Arayüze gönderiliyor
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo eklendi");
    }

    //Başka bir sayfaya kaçmasını engelliyor 
    e.preventDefault(); 
}


//^ Yeni Todo yu arayüze ekleme fonksiyonu
function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}


//^ Yeni Todo yu Storage'ye ekleme fonksiyonu
function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//^ Storage da ki todoların kontrol fonksiyonu
function checkTodosFromStorage() {
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

//^ Todo silme fonksiyonu
function removeTodoToUI(e) {
    if(e.target.className === "fa fa-remove") {
        // UI'dan silme 
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        // Storage'den silme
        removeTodoToStorage(todo.textContent);
        showAlert("success", "Todo başarıyla silindi");
    }
}

//^ Todo'yu storageden silme fonksiyonu
function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach((todo,index) => {
        if(removeTodo === todo) {
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

//^ Todoların hepsini temizleme fonksiyonu
function allTodosEverywhere() {
    if(todoList.firstChild) {
        //UI'dan silme
        while(todoList.firstChild) {
            todoList.firstChild.remove();
        }

        // Storage'den silme
         todos = [];
         localStorage.setItem("todos", JSON.stringify(todos));

         showAlert("success", "Başarılı bir şekilde silindi");
    }else {
        showAlert("warning", "Silmek için en az 1 todo olmalıdır");
    }
}


//^ Ürünleri filtreleme fonksiyonu
function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();

    if(todoList.firstChild) {
        const childrens =  Array.from(todoList.children);

        childrens.forEach(children => {
            if(children.textContent.toLowerCase().includes(filterValue)) {
                children.setAttribute("style", "display : block");
            }else {
                children.setAttribute("style", "display : none !important");
            }
        });
    }else {
        showAlert("warning", "Filtreleme yapmak için en az bir todo olmalıdır!");
    }
}


//^ Renkli alert gösterme fonksiyonu
function showAlert(type, message) {
    const div = document.createElement("div");
    //& div.className = "alert alert-" + type;
    div.className = `alert alert-${type}`;  // literal template
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
         div.remove();
    },2500);
}