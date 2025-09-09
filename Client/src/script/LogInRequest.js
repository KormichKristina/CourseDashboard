export async function LogIn(name,password) {

    const data={Name:name,Password:password};

    
    const response = await fetch('https://localhost:7270/api/login',{
        method:"POST",
        credentials: 'include',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(!response.ok){
        throw new Error("this user is not exist");
    }
    const tokens=await response.json();
    localStorage.setItem("access",tokens.accessToken);
    localStorage.setItem("refresh",tokens.refreshToken)
    localStorage.setItem("password",password);
    return tokens;
        
    
    
}