class Github{

    async getUser(user){

        const profilRespose = await fetch(`https://api.github.com/users/${user}`).then(res => res.json());        
        let reposRespose = await fetch(`https://api.github.com/users/${user}/repos`).then(res => res.json());        
    
        const repoCnt = ((reposRespose.length <= 5) ? reposRespose.length : 5); //최대 5개   
        reposRespose = reposRespose.slice(0, repoCnt); 
        // console.log(profilRespose, reposRespose);

        return {profilRespose, reposRespose};
    }
}