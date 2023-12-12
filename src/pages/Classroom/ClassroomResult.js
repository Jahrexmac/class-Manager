import React, { useState, useEffect } from 'react'
import Header from '../../components/Layouts/Header'
import NavItem from '../../components/HeaderComponents/NavItem'
import { useParams } from "react-router-dom";
import { getClass, getStudents } from '../Classroom/Helper/Helper';
import { getAssessmentList, getGradeSchemeList, getStudentSubjects, positionAssigner } from '../academics/Helper';
import { studentResultCalculator } from '../Student/Helper/Helper';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useTitle } from '../../hooks/useTitle';

export default function ClassroomResult() {
    useTitle('Class Result')
    const { id } = useParams();
    const [classroom, setClassroom] = useState([]);
    const [allResult, setAllResult] = useState([]);
    const [assessmentList, setAssessmentList] = useState([]);
    const [allPositionedResult, setAllPositionedResult] = useState([]);
    const [allTotal, setAllTotal] = useState([]);
   
    const navItem = [
        <NavItem key={1} path={`/simplified-result/${id}`} name="Simplified Result" />,
        <NavItem key={2} path={`/classroom-details/${id}`} name="Back to class" />,
    ]


    const gradeRed = "px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500 dark:text-red-500"
    const gradeblack = "px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-900"
    
   
    useEffect(() => {
        async function fetchClasses() {
            try {
                const classroomData = await getClass(id);
                setClassroom(classroomData);
                const studentsData = await getStudents(id);
                const assessmentListData = await getAssessmentList(id);
                setAssessmentList(assessmentListData[0].assessments);
                const gradeData = await getGradeSchemeList(parseInt(id)); // grading scheme
                let allResultData = []
                let allTotalData = []

                if (studentsData.length) {
                    // studentsData.map((student) => {
                    for (let i = 0; i < studentsData.length; i++) {
                        let studentResult = {
                            name: '',
                            result: [],
                            studentId: ''
                        }
                        const allSubjectData = await getStudentSubjects(studentsData[i].id);
                        const resultData = await studentResultCalculator(allSubjectData, gradeData)
                        studentResult.name = studentsData[i].name;
                        studentResult.studentId = studentsData[i].id
                        studentResult.result = resultData
                        studentResult.result.push((resultData[1] / allSubjectData.length).toFixed(2))
                        allResultData.push(studentResult)
                        allTotalData.push(studentResult.result[1])
                    }

                    setAllResult(allResultData);
                    setAllTotal(allTotalData)

                }
                // console.log(allResultData)

            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchClasses();
    }, []); //eslint-disable-line

    useEffect(() => {
        async function fetchClasses() {
            let tempResultPosition = []
            let sortTotal = []
            let filteredTotal = [...new Set(allTotal)]
            sortTotal = filteredTotal.sort((a, b) => b - a)
            // eslint-disable-next-line 
            sortTotal.map((val, i) => {
                // eslint-disable-next-line 
                allResult.map((result) => {
                    let tempResult = result
                    if (result.result[1] === val) {

                        tempResult['position'] = positionAssigner(i + 1)
                        tempResultPosition.push(tempResult)

                    }

                })
            })

            setAllPositionedResult(tempResultPosition)
        }
        fetchClasses();
    }, [allResult]); //eslint-disable-line

    const handleGeneratePdf = () => {


        const doc = new jsPDF({
          format: 'a4',
          unit: 'pt',
          orientation: 'p'
        })
  
    const element = document.getElementById('main')
    console.log(element)

    let i = 1 //exclude the first div carrying download result
    while(i < element.children.length){   
        doc.autoTable({html:element.children[i].children[0].children[0]})
        i++
    }
    
   
    
    doc.save(`${classroom.name}-Result`)
      }
    


    return (
        <>
            <Header title={`${classroom.name} Result`} links={navItem} loggedIn={true}></Header>
     
            <main  id='main' className='dark:bg-gray-700 flex-col justify-around'  >
                       <div className='my-20  text-center dark:bg-gray-700 dark:text-green-300 text-green-300'>
                        <button className=' dark:hover:bg-gray-800 hover:bg-gray-800 dark:bg-gray-500 my-2 bg-gray-700 rounded py-2 px-2' onClick={handleGeneratePdf}> Download Result</button>

                        </div>
               
                {
                    allPositionedResult.length ?
                        allPositionedResult.map((subjectResult) => (

                            <div key={subjectResult.position}>
                                {/* <div className=' flex justify-end'>                                    
                                    <p className="dark:text-gray-400 px-2 py-2 text-sm font-medium mr-4">{subjectResult.name ? (subjectResult.name).toUpperCase(): ''}</p>
                                    <p className="dark:text-gray-400 px-2 py-2 rounded-md text-sm font-medium mr-4">Position: {subjectResult.position}</p>
                                    <p className="dark:text-gray-400 px-2 py-2 rounded-md text-sm font-medium mr-4">Total: {subjectResult.result[1]}</p>
                                    <p className="dark:text-gray-400 px-2 py-2 rounded-md text-sm font-medium mr-4">Average: {subjectResult.result[2]}</p>
                                </div> */}

                                {/* {% if subjects %} check if subject in class */}
                                {assessmentList.length ?
                                    <>
                                     <div className="overflow-x-auto">
                                            <table className="w-full table-auto divide-y divide-gray-200 ">
                                                <thead>
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                    {subjectResult.name ? (subjectResult.name).toUpperCase(): ''}   
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                    Position: {subjectResult.position}
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                    Total: {subjectResult.result[1]}
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                    Average: {subjectResult.result[2]}
                                                    </th>
                                                    <th></th>
                                                    {assessmentList.length ?
                                                            assessmentList.map((assessment, i) => (
                                                                <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-yellow-400 text-gray-500 uppercase tracking-wider">
                                                                    
                                                                </th>
                                                            )) :
                                                            <th></th>
                                                        }

                                                    </tr>
                                                </thead>
                                                <thead className="bg-gray-50 dark:bg-gray-500">
                                                   
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                            S/N
                                                        </th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                            Subject
                                                        </th>
                                                        {/* {% for data in table%} for table head */}
                                                        {assessmentList.length ?
                                                            assessmentList.map((assessment, i) => (
                                                                <th key={assessment} scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-yellow-400 text-gray-500 uppercase tracking-wider">
                                                                    {assessment}
                                                                </th>
                                                            )) :
                                                            <th></th>
                                                        }

                                                        {/* {% endfor %} */}
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                            Total
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                            Grade
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                                                            Remark
                                                        </th>

                                                    </tr>
                                                </thead>

                                                {/* {% for item in subjects %} for individual subject and its info */}


                                                <tbody className="bg-white dark:bg-gray-200 divide-y divide-gray-200">

                                                    {subjectResult.result[0].map((result) => (
                                                        <tr key={result.sn}>
                                                            <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                                                {result.sn}
                                                            </td>
                                                            <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                                                {(result.subject).toUpperCase()}
                                                            </td>
                                                            {/* loop the scores for assessment */}
                                                            {result.assessment.map((score, i) => (
                                                                <td key={Math.random() * 100} className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                                                    {score}
                                                                </td>
                                                            ))

                                                            }
                                                            {/* end of scores loop */}
                                                            <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                                                {result.total}
                                                            </td>
                                                            <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                                                {result.gradeLetter}
                                                            </td>
                                                            <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                                                {result.remark}
                                                            </td>

                                                        </tr>
                                                    ))

                                                    }

                                                </tbody>
                                                {/* end of loop */}
                                            </table>
                                            </div>
                                    </>
                                    :
                                    <div>No Class Result</div>
                                }
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                        ))
                        :
                        <div></div> // end of allpositioned result
                }
           
                        
            </main>

        </>
       

    )
}
