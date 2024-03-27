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

    showAlert(){
        this.profile.innerHTML = 'Not Found';
        this.repos.innerHTML= `Not Found`;
    }

    clear(){
        this.profile.innerHTML = ``;
        this.repos.innerHTML= ``;
    }

}