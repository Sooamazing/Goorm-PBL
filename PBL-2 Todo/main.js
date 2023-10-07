// 변수명 명확, 최소 단위로 함수 자르기
//localStorage 이용해 새로고침해도 페이지 유지될 수 있게

const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector(".todos");
const addTodo = document.querySelector(".createNewTodo");

// 맨 처음 start, 이전 localStorage에 저장된 값 받아오기
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//받아온 tasks로 이미 쌓인 todo 목록 생성
if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createList(task);
  });
}

//Form에서 "submit" 시 localStorage에 저장
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); //submit 제출, 새로고침은 X
  const input = e.target.children[0];
  const inputValue = input.value;

  if (inputValue != "") {
    const task = {
      id: new Date().getTime(),
      name: inputValue,
      isCompleted: false,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createList(task);
    todoForm.reset();
  }

  input.focus();
});

// 목록 생성, localStorage 저장된 값 기준
function createList(task) {
  const taskEl = document.createElement("li");
  taskEl.className = "todoLine";
  taskEl.setAttribute("id", task.id);
  const taskElMarkup = `
   <input ID="${task.name}-${task.id}" name="tasks" type="checkbox" ${
    task.isCompleted ? "complete" : ""
  }>
   <span class="task">${task.name}</span>
   <div class="editAndDelete">

           <button title = "reviseTask" type="submit" class="edit-button">                        
               <img class="edit-button" src="assets/icon_pencil-100.svg" alt="Revise-button">
           </button>
           <button title="delete ${
             task.name
           }Task" type="submit" class="delete-button">
               <img class="delete-button" src="assets/icon_delete-100.svg" alt="Delete-button">
           </button>                        
       
   </div>   
   `;

  taskEl.innerHTML = taskElMarkup;
  task.isCompleted ? taskEl.classList.toggle("complete") : "";

  todoList.appendChild(taskEl);
}

// 생성된 목록에서 지우기
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

//localStorage에 저장됐던 Id 이용해 삭제, HTML도 id 이용해 삭제
function removeTask(taskId) {
  //해당 Id 제외한 배열 생성
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
}

//생성된 목록에서 수정하기

//수정 버튼 누르면 수정 가능하도록
todoList.addEventListener("click", (e) => {
  const { target: button } = e; //e.target을 button 변수로
  const taskId = e.target.closest("li").id;
  clickEditButton(taskId, button);
});

function clickEditButton(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));
  const taskLi = el.closest("li");
  console.log(7, task);
  if (el.classList.contains("edit-button")) {
    console.log(10, task);
    if (taskLi.classList.contains("complete")) {
      return;
      console.log(11, task);
    }
    console.log(12, task);
    const span = el.parentNode.parentNode.previousSibling.previousSibling;
    span.setAttribute("contenteditable", "");
    span.focus();
  }
}

//수정 시 그 내용 저장
todoList.addEventListener("input", (e) => {
  const { target: span } = e;
  const taskId = e.target.closest("li").id;
  updateEditTask(taskId, span); //e.target 요소 반환
});

function updateEditTask(taskId, el) {
  if (!el.classList.contains("task")) {
    return;
  }

  const task = tasks.find((task) => task.id === parseInt(taskId));
  task.name = el.textContent;
  console.log(3, task);
  el.addEventListener("blur", function (e) {
    e.preventDefault();
    e.target.removeAttribute("contenteditable");
  });
  console.log(2, task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//완료 - 미완료 상태 변경 (완료 여부 기준)
todoList.addEventListener("change", (e) => {
  const { target: input } = e;
  const taskId = e.target.closest("li").id;
  completeTask(taskId, input);
});

function completeTask(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));
  console.log(1, task); //한 개의 객체 세트 반환
  const taskLi = el.closest("li");
  const span = el.nextElementSibling;

  //li에 complete class 토글, localStorage 값 바꾸기
  taskLi.classList.toggle("complete");
  task.isCompleted = !task.isCompleted;

  if (task.isCompleted) {
    span.removeAttribute("contenteditable");
  }
  console.log(8, task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//enter 발생 시 작성 완료로 간주
todoList.addEventListener("keydown", function (e) {
  const { target: span } = e;
  if (e.keyCode === 13) {
    //   e.preventDefault();
    span.removeAttribute("contenteditable");
  }
});

//toggle 시 입력 메뉴 껐다 켰다

addTodo.addEventListener("click", doDisplay);

function doDisplay() {
  let formWrapperHidden = document.querySelector("#form-wrapper");

  if (formWrapperHidden.classList.contains("hidden")) {
    formWrapperHidden.classList.toggle("hidden");
  } else {
    formWrapperHidden.classList.toggle("hidden");
  }
}
