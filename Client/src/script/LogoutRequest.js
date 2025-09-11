import { Refresh } from "./Refresh";

export async function LogoutRequest(accessToken) {

    
    let tokenString='Bearer '+accessToken;
    let response = await fetch('http://localhost:7270/api/logout',{
    method:"POST",
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenString
    }
    })
    if(!response.ok){
        let newAccessToken=await Refresh();
        await Logout(newAccessToken);
    }
    
}