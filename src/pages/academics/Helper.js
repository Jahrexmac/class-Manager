// this is for first time adding of subject to class or for adding new subject to class
// retrieve all student
// sort subject list in alphabetical order and save a list of it for future student
// create the subject
// use the subject just created to create all the assessment save a list of assessment for future student
// go to next student



function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return { token, cmid };
}


export async function addSubject(subjectDetail) {

    const browserData = getSession();

    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(subjectDetail),

    }
    //${process.env.REACT_APP_HOST}
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/subject`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}

export async function addAssessment(assessmentDetail) {

    const browserData = getSession();

    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(assessmentDetail),

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/assessment`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}


export async function assessmentCreator(students, subjectList, assessmentList) {
    let i = 0;
    while (i < students.length) { // student outer loop

        let j = 0;
        while (j < subjectList.length) { // inner loop subject 
            try {
                let subjectDetail = {
                    name: subjectList[j],
                    student: students[i].id,
                }

                const data = await addSubject(subjectDetail);
                let k = 0
                while (k < assessmentList.length) { // most inner loop assessment
                    let assessmentDetail = {
                        name: assessmentList[k],
                        score: 0,
                        subject: data.id
                    }
                    addAssessment(assessmentDetail);
                    k++;

                }

            } catch (error) {
                //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
                // this will carry a error message cos registration failed

            }
            j++;
        }

        i++;
    }

}

export async function addSubjectList(subjectList, id) {

    const subjectDetail = {
        subjects: subjectList,
        classroom: id
    }
    const browserData = getSession();

    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(subjectDetail),

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/subjectlist`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    // const data = await response.json();

    // return data;
}
export async function editSubjectList(subjectDetail, id, subjectLength) {
    let requestOptions = {}

    const browserData = getSession();

    if (subjectLength < 2) {
        requestOptions = {
            method: "DELETE",
            headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },

        }

        fetch(`${process.env.REACT_APP_HOST}/660/subjectlist/${id}`, requestOptions);
        fetch(`${process.env.REACT_APP_HOST}/660/assessmentlist/${id}`, requestOptions);


    } else {
        requestOptions = {
            method: "PUT",
            headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
            body: JSON.stringify(subjectDetail),

        }
        const response = await fetch(`${process.env.REACT_APP_HOST}/660/subjectlist/${id}`, requestOptions);
        if (!response.ok) {
            throw { message: response.statusText, status: response.status }; //eslint-disable-line
        }
        const data = await response.json();

        return data;

    }

}

export async function deleteSubjectListAndAssessmentlist(id) {

    const browserData = getSession();


    const requestOptions = {
        method: "DELETE",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },

    }

    fetch(`${process.env.REACT_APP_HOST}/660/subjectlist/${id}`, requestOptions);
    fetch(`${process.env.REACT_APP_HOST}/660/assessmentlist/${id}`, requestOptions);



}

export async function addAssessmentList(assessmentList, id) {
    const assessmentDetail = {
        assessments: assessmentList,
        classroom: id
    }

    const browserData = getSession();

    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(assessmentDetail),

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/assessmentlist`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    // const data = await response.json();

    // return data;
}


export async function getStudentAssessmentList(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/assessment?subject=${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function getSubjectList(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/subjectlist?classroom=${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function getAssessmentList(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/assessmentlist?classroom=${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function subjectAndAsessementDelete(students, subjectNames) {
    let i = 0
    while (i < students.length) { // need

        let j = 0;
        while (j < subjectNames.length) { //need


            const subjectDelete = await getSubjectDelete(subjectNames[j], students[i].id) //loop

            if (subjectDelete.length) {

                const assessmentDeleteList = await getAssessmentDelete(subjectDelete[0].id)
                if (assessmentDeleteList.length) {
                    let z = 0
                    while (z < assessmentDeleteList.length) {
                        deleteAssessment(assessmentDeleteList[z].id)
                        z++;
                    }
                }
                // get all accessment
                deleteSubject(subjectDelete[0].id);
                // edit subjectlist to remove the subject
            }

            j++;
        }
        i++;
    }

}

export async function getSubjectDelete(subjectName, studentId) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/subject?name=${subjectName}&student=${studentId}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function getAssessmentDelete(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/assessment?subject=${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function editAssessment(assessmentDetail, id){
    
    const browserData = getSession();

    const requestOptions = {
        method: "PUT",
        headers: {"content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},
        body: JSON.stringify(assessmentDetail),
        
    }  
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/assessment/${id}`, requestOptions);

    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}


export async function deleteSubject(id) {

    const browserData = getSession();

    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },

    }

    fetch(`${process.env.REACT_APP_HOST}/660/subject/${id}`, requestOptions)


}

export async function deleteAssessment(id) {

    const browserData = getSession();

    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },

    }

    fetch(`${process.env.REACT_APP_HOST}/660/assessment/${id}`, requestOptions);

    return


}


export async function getStudentSubjects(studentId) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/subject?student=${studentId}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}


export async function getSubject(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/subject/${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function getAllStudentSubject(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/subject?student=${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function addGradeScheme(gradeDetail) {

    const browserData = getSession();

    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(gradeDetail),

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/gradescheme`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}

export async function getGradeSchemeList(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/gradescheme?classroom=${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function getGradeScheme(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/gradescheme/${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function editGradingScheme(gradeSchemeDetail, id){
    
    const browserData = getSession();

    const requestOptions = {
        method: "PUT",
        headers: {"content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},
        body: JSON.stringify(gradeSchemeDetail),
        
    }  
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/gradescheme/${id}`, requestOptions);

    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}


export async function deleteGradingScheme(id) {

    const browserData = getSession();

    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },

    }

    fetch(`${process.env.REACT_APP_HOST}/660/gradescheme/${id}`, requestOptions);

    return


}

//                                  UTILITY FUNCTION

export function positionAssigner(num){
   
    num = (num + '');
    if (num.endsWith('1') && parseInt(num) !== 11 && !num.endsWith('11')){
        return num +'st'
    }else if (num.endsWith('2') && parseInt(num) !== 12 && !num.endsWith('12')){
        return num + 'nd'
    }else if (num.endsWith('3') && parseInt(num) !== 13 && !num.endsWith('13')){
        return num + 'rd'
    }else{
        return num + 'th'   
    }
} 