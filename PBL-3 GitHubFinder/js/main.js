
const github = new Github;
const ui = new Ui;

const profile = document.getElementById("profile");
const repos = document.getElementById("repos");
const inputSearch = document.getElementById("inputSearch");
const submitsform = document.getElementById("submitsform");     


submitsform.addEventListener("submit", async function(e){
    try{

        e.preventDefault();

        const userInput = inputSearch.value;
    
        if(userInput!=''){

                const data = await github.getUser(userInput);
                ui.showProfile(data.profilRespose);
                ui.showrepos(data.reposRespose);
    
        } else{
    
            // 입력 0이면 아무것도 안 보이게
            ui.clear()
        }
        
    }catch(error){
        // Not Found면 경고 설정
        ui.showAlert();
    }    

});




