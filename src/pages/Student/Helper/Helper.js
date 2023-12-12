import { getStudentAssessmentList } from "../../academics/Helper";


function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return { token, cmid };
}

export async function addStudent(studentDetail) {

    const browserData = getSession();

    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(studentDetail),

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/student`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}
export async function editStudent(studentDetail, id) {

    const browserData = getSession();

    const requestOptions = {
        method: "PUT",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(studentDetail),

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/student/${id}`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}

export async function getStudent(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` }

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/student/${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}


export async function deleteStudent(id) {
    const browserData = getSession();
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },

    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/student/${id}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    // const data = await response.json();
    // return data;
}






//                          UTILITY FUNCTIONS

export async function studentResultCalculator(allSubjectData, grades) {
    let i = 0;
    let studentResult = []
    let grandTotalTemp = 0
    while (i < allSubjectData.length) {
        const subjectAssessment = await getStudentAssessmentList(allSubjectData[i].id);

        let subjectResult = {
            subject: allSubjectData[i].name,
            assessment: [],
            total: 0,
            sn: i + 1,
            subjectId: allSubjectData[i].id,
            remark: 'NA',
            gradeColor: 'black',
            gradeLetter: 'NA'
        }

        let y = 0
        while (y < subjectAssessment.length) {
            subjectResult.assessment.push(subjectAssessment[y].score)
            subjectResult.total = subjectResult.total + subjectAssessment[y].score

            y++
        }
        grandTotalTemp = grandTotalTemp + subjectResult.total
        
        let z = 0
        while (z < grades.length){
            if (subjectResult.total >=  grades[z].start && subjectResult.total <= grades[z].end){
                subjectResult.remark = grades[z].remark;
                subjectResult.gradeColor = grades[z].color
                subjectResult.gradeLetter = grades[z].letter
            }

            
            z++
        }
        studentResult.push(subjectResult);
        i++
}

    return [studentResult, grandTotalTemp]
}