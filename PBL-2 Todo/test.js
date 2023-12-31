/**
 * 해당 파일
 * 각 eventlistener에서 todoForm 말고 각 버튼으로 동작 시도 - 시간 부족으로 미룸
 * createList에서 onClick으로 설정하는 등 각 list에 eventlistener를 설정해 줘야 함.
 */

// 변수명 명확, 최소 단위로 함수 자르기
//localStorage 이용해 새로고침해도 페이지 유지될 수 있게

//  입력
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
//얘도 버튼으로 하면 오류났던 듯.????
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

  const delBtn = document.querySelector("img.delete-button");
  const editBtn = document.querySelector("img.edit-button");
  const taskSpan = document.querySelector("span.task");
  const checkbox = document.querySelector("input[type=checkbox]");

  //이벤트

  delBtn.addEventListener("click", (e) => {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  });

  editBtn.addEventListener("click", (e) => {
    const { target: button } = e; //e.target을 button 변수로
    const taskId = e.target.closest("li").id;
    clickEditButton(taskId, button);
  });

  //수정 시 그 내용 저장
  taskSpan.addEventListener("input", (e) => {
    const { target: span } = e;
    const taskId = e.target.closest("li").id;
    updateEditTask(taskId, span); //e.target 요소 반환
  });

  //완료 - 미완료 상태 변경 (완료 여부 기준)
  checkbox.addEventListener("change", (e) => {
    const { target: input } = e;
    const taskId = e.target.closest("li").id;
    completeTask(taskId, input);
  });

  //enter 발생 시 작성 완료로 간주

  taskSpan.addEventListener("keydown", function (e) {
    const { target: span } = e;
    if (e.keyCode === 13) {
      //   e.preventDefault();
      span.removeAttribute("contenteditable");
    }
  });
}

//전부 .. 실패함. 대입하면 null 반환 , 이 위치에 있으면 새로 고침 후 첫 번째만 하기 내용들 가능하고, editBtn 활성화는 아예 안 됨 ㅠ
//아무래도 맨 처음 로드될 때는... html이 생성이 안 되어 있어서 그런 거 같은데, 어떻게 해야 할지 모르겠음.
//새로 고침을 해도 querySelector라는 이름에 맞게 맨 첫 요소에만 적용이 되니까...
//그래서 그냥 하나 있는 todolist로 계속 접근한 건가?
//근데 만약 원래 html에서 10개 리스트 생성돼 있는 상황에서 쿼리 셀렉터로 하면..결국 난 맨첫요소 하나만.. 변경이 가능한 거임..? .. 오우..... 그 속성 갖고 있는 전부를 하고 싶은데!?!?!??
//실행이 되자마자 event 그게 실행해서 createlist 안에 줘야 함.

// 생성된 목록에서 지우기

// todoList.addEventListener("click", (e) => {

//    if (e.target.classList.contains("delete-button"))
//    {
//       const taskId = e.target.closest("li").id;
//       removeTask(taskId);
//    }
// });

//localStorage에 저장됐던 Id 이용해 삭제, HTML도 id 이용해 삭제
function removeTask(taskId) {
  //해당 Id 제외한 배열 생성
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
}

//생성된 목록에서 수정하기

function clickEditButton(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));
  const taskLi = el.closest("li");
  console.log(7, task);

  if (taskLi.classList.contains("complete")) {
    console.log(11, task);
    return;
  }
  const span = el.parentNode.parentNode.previousSibling.previousSibling; //얘 왜 시블링 두 번임..? ㅠㅠ 한 번이어야 하는디
  console.log(11, el.parentNode.parentNode.previousSibling); //#text 출력, 왜?
  span.setAttribute("contenteditable", "");
  span.focus();
}

function updateEditTask(taskId, el) {
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

//수정 버튼 누르면 수정 가능하도록
// todoList.addEventListener("click", (e) => {
//    const { target : button } = e; //e.target을 button 변수로
//    const taskId = e.target.closest("li").id;
//    clickEditButton(taskId, button);
//  }); // editbutton으로 가져오는 게 나음.

// function clickEditButton(taskId, el){
//    const task = tasks.find((task) => task.id === parseInt(taskId));
//    const taskLi = el.closest("li");
//    console.log(7, task);
//    if (el.classList.contains("edit-button")) {
//       console.log(10, task);
//       if(taskLi.classList.contains("complete")){
//          return;
//          console.log(11, task);
//       }
//       console.log(12, task);
//       const span = el.parentNode.parentNode.previousSibling.previousSibling;
//       span.setAttribute("contenteditable", "");
//       span.focus();
//    }
// }

// //수정 시 그 내용 저장
// todoList.addEventListener("input", (e) => {
//    const { target: span } = e;
//    const taskId = e.target.closest("li").id;
//    updateEditTask(taskId, span); //e.target 요소 반환
// });

// function updateEditTask(taskId, el) {
//    if(!(el.classList.contains('task'))){
//       return;
//    }

//    const task = tasks.find((task) => task.id === parseInt(taskId));
//    task.name = el.textContent;
//    console.log(3, task);
//    el.addEventListener("blur", function (e){
//       e.preventDefault();
//       e.target.removeAttribute("contenteditable");
//    });
//    console.log(2, task);
//    localStorage.setItem("tasks", JSON.stringify(tasks));
// }

//  //완료 - 미완료 상태 변경 (완료 여부 기준)
// todoList.addEventListener("change", (e) => {
//    const {target : input} = e;
//    const taskId = e.target.closest("li").id;
//    completeTask(taskId, input);
// });

// function completeTask(taskId, el) {

//    const task = tasks.find((task) => task.id === parseInt(taskId));
//    console.log(1, task); //한 개의 객체 세트 반환
//    const taskLi = el.closest("li") ;
//    const span = el.nextElementSibling;

//    //li에 complete class 토글, localStorage 값 바꾸기
//    taskLi.classList.toggle('complete');
//    task.isCompleted = !task.isCompleted;

//    if (task.isCompleted) {
//       span.removeAttribute("contenteditable");
//    }
//    console.log(8, task);

//    localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// todoList.addEventListener("keydown", function (e) {
//    const { target : span } = e;
//    if (e.keyCode === 13) {
//    //   e.preventDefault();
//       span.removeAttribute("contenteditable"); //이건.. todoList를 선택한 건데 왜 ... 바뀌는 건 span 성질이 바뀌지?
//    }
// });

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
