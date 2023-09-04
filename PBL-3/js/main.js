// import {Github} from './Github.js';
// import {Ui} from './Ui.js';
//class 분리하는 법도.. ㅎㅎ.. ㅠㅠ 왜 난 다른파일에 넣으면 안 되지..? 

class Github{

    constructor() {    
    }
            //await, async 있어야 받아왔음!!!!!!!!!!!!! >> promise 에서 가져오는 거!!!!!!
    
    async getUser(user){

        // 여기서 catch로 예외나오면 null 반환하도록 하는 법, null 이면  메인.js에서 if로 낫파운드 나오게? 
        // 아니면 여기서 무슨 .. 에러가 뜨는 건지 줄 수 있나? 그냥 GET 어쩌구 404라는데 이걸 어떤 에러코드로 줘야 하는 건지 모르겠음!
        // catch로 처리하는 건 별로? 
        const profilRespose = await fetch(`https://api.github.com/users/${user}`).then(res => res.json());        
        let reposRespose = await fetch(`https://api.github.com/users/${user}/repos`).then(res => res.json());        
    
        const repoCnt = ((reposRespose.length <= 5) ? reposRespose.length : 5); //최대 5개   
        reposRespose = reposRespose.slice(0, repoCnt); 
        // console.log(profilRespose, reposRespose);

        return {profilRespose, reposRespose};
    }
}

class Ui {

    constructor() {

        this.profile = document.getElementById("profile");
        this.repos = document.getElementById("repos");

    }

    showProfile(user){
       
        const profileMarUp = `
<section class="overalProfile">
    <div class="profile">
        <img src="${user.avatar_url}" alt="userpicture">
        <a href="${user.html_url}"><button>
            View Profile
        </button></a>
    </div>
    
    <div class="profileInfo">
        <div class="influence">
            <span class="publicRepos">Public Repos: ${user.public_repos}</span>
            <span class="publicGists">Public Gists: ${user.public_gists}</span>
            <span class="followers">Followers: ${user.followers}</span>
            <span class="following">Following: ${user.following}</span>
        </div>
        <div class="personalInfo">
            <p class="company">Company: ${user.company}</p>
            <p class="website">Website/Blog: ${user.blog}</p>
            <p class="location">Location: ${user.location}</p>
            <p class="memberSince">Member Since: ${user.created_at}</p>
        </div>          
    </div>
</section>    
<div class="greenary">
    <img src="http://ghchart.rshah.org/${user.login}" alt="user's greenary"> 
</div>        
    `;
    

        this.profile.innerHTML = profileMarUp;
    }   


    showrepos(repos){
        let reposMarUp = '';
        //이걸 따로 한 이유가 있었따... 아래에서는 한번밖에 안 돼서 음... append로 하면 됐겠지만 우선... 나중에 다시 그렇게 구현하거나 해 봐야지.

        repos.forEach(repo => {
            // console.log(repo.html_url);
            reposMarUp +=   `
                <li class="repo">
                    <span class="repoName"><a href="${repo.html_url}">${repo.name}</a></span>
                    <div class="subscriber">
                        <span class="stars">Stars: ${repo.stargazers_count}</span>
                        <span class="watchers">Watchers: ${repo.watchers_count}</span>
                        <span class="forks">Forks: ${repo.forms_count}</span>
                    </div>
                </li>   
        `

        });
        // console.log(reposMarUp);
        this.repos.innerHTML = reposMarUp; 
    }

    // 시간이 좀 나면.. 경고 띄우는 것도.... CSS... 해보자...

    showAlert(){
        this.profile.innerHTML = 'Not Found';
        this.repos.innerHTML= `Not Found`;
    }

    clear(){
        this.profile.innerHTML = ``;
        this.repos.innerHTML= ``;
    }

}


const github = new Github;
const ui = new Ui;

const profile = document.getElementById("profile");
const repos = document.getElementById("repos");
const inputSearch = document.getElementById("inputSearch");
// const searchBtn = document.getElementById("searchBtn");
const submitsform = document.getElementById("submitsform");     

// form 없이 버튼으로 이벤트리스터하면 왜 인풋 밸류가 안 받아와질까? 
//그것도 맨 처음에 받아온 밸류가 0이라서 그 상태로 안 바뀌는 건가?

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
    }catch{
        // Not Found면 경고 설정
        ui.showAlert();
    }    

});




