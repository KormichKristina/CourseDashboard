export async function Refresh() {
    let response = await fetch('https://localhost:7270/api/refresh',{
        method:"POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
        })
    if(!response.ok){
        throw new Error("not authorized!");
    }
    let data=await response.json();
    return data;

}