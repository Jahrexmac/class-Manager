
function getSession(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return {token, cmid};
}

export async function createClass(classDetail){
    
    const browserData = getSession();

    const requestOptions = {
        method: "POST",
        headers: {"content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},
        body: JSON.stringify(classDetail),
        
    }  
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/classroom`, requestOptions);

    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}

export async function getClasses(){
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/classroom?user=${browserData.cmid}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function getClass(id){
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/classroom/${id}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function editClass(classDetail, id){
    const browserData = getSession();
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},
        body: JSON.stringify(classDetail)

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/classroom/${id}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function deleteClass(id){
    const browserData = getSession();
    const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/classroom/${id}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    // const data = await response.json();
    // return data;
}


export async function getStudents(id){
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/student?classroom=${id}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}