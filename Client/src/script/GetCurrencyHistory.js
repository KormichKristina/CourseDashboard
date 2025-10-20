export async function GetCurrencyHistory(baseCode) {

    let url=`http://localhost:7126/api/history/${baseCode}`
    const response = await fetch(url,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(!response.ok){
        console.log("imposible to get history");
    }
    else{
        let data=await response.json();
        console.log(data);
        return data;
    }
    
}