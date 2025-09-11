export async function ConversionRequest(baseCode,targetCode,amount) {

    let url=`http://localhost:7126/api/conversion/${baseCode}/${targetCode}/${amount}`
    const response = await fetch(url,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(!response.ok){
        console.log("imposible to calculate");
    }
    else{
        let data=await response.json();
        return data;
    }
    
}