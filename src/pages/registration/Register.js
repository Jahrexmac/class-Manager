export default async function register(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(authDetail)
    }  
    const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions);
    if(!response.ok){
        throw { message: 'Email Already Registered', status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    
    if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("userid", JSON.stringify(data.user.id));
    }
    return data;
}