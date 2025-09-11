import { Refresh } from "./Refresh";


export async function GetMyInfo(accessToken){

    let tokenString='Bearer '+accessToken;
    let response = await fetch('http://localhost:7270/api/me',{
    method:"GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenString
    }
    })
    console.log(tokenString);

    if(!response.ok){
        
        let newAccessToken=await Refresh();
        localStorage.setItem("access",newAccessToken);

        return (await GetMyInfo(newAccessToken));

    }
    let data=await response.json();
    localStorage.setItem("name",data.name);
    localStorage.setItem("currencies",data.currencies);
    return data;

}