export async function SignUp(name,password) {

    const data={Name:name,Password:password};

    
    const response = await fetch('https://localhost:7270/api/register',{
        method:"POST",
        credentials: 'include',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(!response.ok){
        throw new Error("this user already exists");
    }
    const tokens=await response.json();
    localStorage.setItem("access",tokens.accessToken);
    localStorage.setItem("refresh",tokens.refreshToken)
    localStorage.setItem("password",password);
    return tokens;
        
    
    
}