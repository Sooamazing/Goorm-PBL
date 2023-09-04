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