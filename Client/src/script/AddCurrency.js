export async function AddCurrency(currency,accessToken) {

    let tokenString='Bearer '+accessToken;
    let request= {CurrencyName:currency};
    const response = await fetch('https://localhost:7270/api/currency',{
        method:"POST",
        body:JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    })
    if(!response.ok){
        console.log("imposible to add the currency");
    }
}