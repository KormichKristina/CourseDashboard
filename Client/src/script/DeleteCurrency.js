export async function DeleteCurrency(currency,accessToken) {

    let tokenString='Bearer '+accessToken;
    const response = await fetch('https://localhost:7270/api/currency',{
        method:"DELETE",
        body:JSON.stringify({CurrencyName:currency}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    })
    if(!response.ok){
        console.log("imposible to delete the currency");
    }
}