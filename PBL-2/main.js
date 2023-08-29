// 변수명 명확, 최소 단위로 함수 자르기
//localStorage 이용해 새로고침해도 페이지 유지될 수 있게

//  입력
const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('.todos')
const addTodo = document.querySelector('.createNewTodo');
//const delBtn = document.querySelector('.delete-button');

// 맨 처음 start, 이전 localStorage에 저장된 값 받아오기
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      //배열 생성/ true면 전자, false면 후자 반환?

      
//받아온 tasks로 이미 쌓인 todo 목록 생성
if (localStorage.getItem("tasks")){
   tasks.map((task)=>{
      createList(task);
      //그리고 task는 그냥 tasks 배열(?)의 요소 하나하나를 createList로 만들어라.
   }) //map을 아무데도 저장을 안 하는데 왜 map을 쓴 걸까? ... 각 task를 createList()하라는 건 알겠는데... 그냥 각 task로 createList만 하려고? 값 반환은 ㄴ? 어차피 createList는 만든느 함수니까? void마냥.
}  //근데 그럼 그냥.. task 받아서 create 해주면 되는 거 아닌가/ 왜 굳이? 당장은.. 함수를 몰라서 모르겠ㄴ/
//map 시행해도 같은 함수 아냐? 아닌가..? createList는 .. 뭔가 반환하는 함수가 아니잖아 지금.



//Form에서 "submit" 시 localStorage에 저장
//하기 함수에서 e.target은 버튼이겠지?
todoForm.addEventListener("submit", function (e){
   e.preventDefault(); //submit 제출, 새로고침은 X
   const input = document.querySelector('.taskInput'); //this 속성을 쓰고 싶다면 어떻게 설정하면 될까? 
   // const input = e.target.parentNode.previousSibling;
   console.log(input);
   const inputValue = input.value;

   if(inputValue != ""){
      const task = {
         id: new Date().getTime(),
         name: inputValue,
         isCompleted: false
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
   taskEl.className="todoLine";
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
           <button title="delete ${task.name}Task" type="submit" class="delete-button">
               <img class="delete-button" src="assets/icon_delete-100.svg" alt="Delete-button">
           </button>                        
       
   </div>   
   `;
   taskEl.innerHTML = taskElMarkup;
   task.isCompleted ? taskEl.classList.toggle("complete") : "" ;

   todoList.appendChild(taskEl);
}




// 생성된 목록에서 지우기

todoList.addEventListener("click", (e) => {
  
   if (e.target.classList.contains("delete-button")) 
   {
     const taskId = e.target.closest("li").id;
     removeTask(taskId);   
     console.log(5, task);
   }
 });
//localStorage에 저장됐던 Id 이용해 삭제, HTML도 id 이용해 삭제
//해당 Id 제외한 배열 생성

 function removeTask(taskId) {
   tasks = tasks.filter((task) => task.id !== parseInt(taskId));
   localStorage.setItem("tasks", JSON.stringify(tasks));
   document.getElementById(taskId).remove();
   console.log(6, task);

 }





//생성된 목록에서 수정하기 - e 타켓 설정이 다 엉망임.. ㅠㅠ... 어떻게 해야 효율적?

//수정 버튼 누르면 수정 가능하도록
todoList.addEventListener("click", (e) => {
   const { target : button } = e;
   const taskId = e.target.closest("li").id;
   clickEditButton(taskId, button); //e.target 요소 반환
 });

 function clickEditButton(taskId, el){
   const task = tasks.find((task) => task.id === parseInt(taskId));
   const taskLi = el.closest("li");
   console.log(7, task);
   if (el.classList.contains("edit-button")) {   
      console.log(10, task);
      if(taskLi.classList.contains("complete")){
         return;
         console.log(11, task);
      }      
      console.log(12, task);
      const span = el.parentNode.parentNode.previousSibling.previousSibling;
      //ㅋ...span을 찾는 더 좋은 방법 ㅇ?
      span.setAttribute("contenteditable", "");
      span.focus();
 }
}

//수정 시 그 내용 저장 
//여기도.. ㅠㅠ input이 안 먹혀서 classlist로 아니면 반환하게 해 놓음.. ㅠㅠ

 todoList.addEventListener("input", (e) => {
   const { target: span } = e;
   const taskId = e.target.closest("li").id;
   updateEditTask(taskId, span); //e.target 요소 반환
 });

function updateEditTask(taskId, el) {
   if(!(el.classList.contains('task'))){
      return;
   }

   const task = tasks.find((task) => task.id === parseInt(taskId));
   task.name = el.textContent;
   console.log(3, task);
   el.addEventListener("blur", function (e){
      e.preventDefault();
      e.target.removeAttribute("contenteditable"); //this 사용 가능?
    });
    console.log(2, task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}     





 //완료 - 미완료 상태 변경 (완료 여부 기준)
 //왜 'input'으로 하면 안 되지? e 타겟을 input으로 놨는데도?
 todoList.addEventListener("change", (e) => {
   const {target : input} = e;
   const taskId = e.target.closest("li").id;
   completeTask(taskId, input); //왜 여기에 e.target으로 놓으면 안 되냐.
 });
 
 function completeTask(taskId, el) {

   const task = tasks.find((task) => task.id === parseInt(taskId));
   console.log(1, task);
   //한 개의 배열세트 반환 맞?
   const taskLi = el.closest("li") ; 
   const span = el.nextElementSibling;      

   //li에 complete class 토글, localStorage 값 바꾸기
   taskLi.classList.toggle('complete');
   task.isCompleted = !task.isCompleted;

   if (task.isCompleted) {
      span.removeAttribute("contenteditable");
   }    
   console.log(8, task);

   localStorage.setItem("tasks", JSON.stringify(tasks));
 }




 //enter 발생 시 작성 완료로 간주
 todoList.addEventListener("keydown", function (e) {
   const { target : span } = e; //span이 타겟일 때만 e 발생? 디어쩌구 그거인가? 오늘 배운거 e 중 저 형식(?) 객체에 들어 있는 요소를 쓰겠다.근데 이걸 변수로는 어떻게 씀? 
   if (e.keyCode === 13) {
   //   e.preventDefault(); // 이게 꼭 있어야 하나?
      span.removeAttribute("contenteditable"); //e.target. 대신 span으로 바꿔도 되는 거 맞?
      // e.target.removeAttribute("contenteditable");
   }
 }); 

 
 //toggle 시 입력 메뉴 껐다 켰다

 addTodo.addEventListener('click', doDisplay);

function doDisplay(){ 	
   let formWrapperHidden = document.querySelector("#form-wrapper"); 	

   if(formWrapperHidden.classList.contains("hidden")){ 		
      formWrapperHidden.classList.toggle('hidden'); 	
   }else{ 		
      formWrapperHidden.classList.toggle('hidden'); 	 	
   } 
}
