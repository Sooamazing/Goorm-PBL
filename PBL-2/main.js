// 변수명 명확, 최소 단위로 함수 자르기
//localStorage 이용해 새로고침해도 페이지 유지될 수 있게

//  입력
const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('.todos')
const addTodo = document.querySelector('.createNewTodo');
const delBtn = document.querySelector('.delete-button');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];




//start
if (localStorage.getItem("tasks")){
   tasks.map((task)=>{
      createList(task);
   })
}

//Form에서 "submit" 시 localStorage에 저장

todoForm.addEventListener("submit", function (e){
   e.preventDefault();
   const input = document.querySelector('.taskInput'); //this.name >> 왜 안 되지? 
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
   // input.focus();

});

// 목록 생성

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
   }
 });

 function removeTask(taskId) {
   tasks = tasks.filter((task) => task.id !== parseInt(taskId));
   localStorage.setItem("tasks", JSON.stringify(tasks));
   document.getElementById(taskId).remove();

 }





//생성된 목록에서 수정하기

//update tack - change name
todoList.addEventListener("click", (e) => {
   const taskId = e.target.closest("li").id;
   console.log(taskId);
   updateEditTask(taskId, e.target);
 });

 // update task - change status or name
 todoList.addEventListener("input", (e) => {
   const taskId = e.target.closest("li").id;
   updateTask(taskId, e.target);
 });

 // prevent new lines with Enter
 todoList.addEventListener("keydown", function (e) {
   const { target : span } = e;

   if (e.keyCode === 13) {
     e.preventDefault(); 
      e.target.removeAttribute("contenteditable");
   }
 });

 function updateEditTask(taskId, el){
   const task = tasks.find((task) => task.id === parseInt(taskId));
   const taskLi = el.closest("li");
   if (el.classList.contains("edit-button")) {   
      
      if(taskLi.classList.contains("complete")){
         return;
      }      
      const span = el.parentNode.parentNode.previousSibling.previousSibling;
      console.log(span);
      span.setAttribute("contenteditable", "");
      span.focus();
      task.name = span.textContent;

      span.addEventListener("blur", function (e){
         e.preventDefault();
         e.target.removeAttribute("contenteditable");
       });

   }     
   localStorage.setItem("tasks", JSON.stringify(tasks));
 }

 // update task, comlete
 function updateTask(taskId, el) {
   const task = tasks.find((task) => task.id === parseInt(taskId));
   const taskLi = el.closest("li") ; 
   if (el.hasAttribute("contentEditable")) {      
     task.name = el.textContent;
   } else {      
      //complete

     const span = el.nextElementSibling;
     taskLi.classList.toggle('complete');
     task.isCompleted = !task.isCompleted;
     
     if (task.isCompleted) {
       span.removeAttribute("contenteditable");
       el.setAttribute("complete", "");
     } else {
       el.removeAttribute("complete");
     }
   }
   localStorage.setItem("tasks", JSON.stringify(tasks));
 }
 

 
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
