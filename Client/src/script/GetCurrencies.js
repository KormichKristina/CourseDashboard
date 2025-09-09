
export async function GetCurrencies(baseCode) {
    try{
        const uri = `https://localhost:7126/api/latest`;
        let response= await fetch(uri);
        let data=await response.json();
        return Object.entries(data);
    }
    catch(error){
        console.log("Course microservice is not avialable")
    }
    
    
    
}
