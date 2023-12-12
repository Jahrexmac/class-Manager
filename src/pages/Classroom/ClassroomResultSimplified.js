import React, { useState, useEffect } from 'react'
import Header from '../../components/Layouts/Header'
import NavItem from '../../components/HeaderComponents/NavItem'
import { useParams } from "react-router-dom";
import { getClass, getStudents } from '../Classroom/Helper/Helper';
import { getGradeSchemeList, getStudentSubjects, positionAssigner } from '../academics/Helper';
import { studentResultCalculator } from '../Student/Helper/Helper';
import jsPDF from 'jspdf'
import { useTitle } from '../../hooks/useTitle';


export default function ClassroomResultSimplified() {
    useTitle('Simplified Class Result')
    const { id } = useParams();
    const [classroom, setClassroom] = useState([]);
    const [allResult, setAllResult] = useState([]);
    const [allPositionedResult, setAllPositionedResult] = useState([]);
    const [allTotal, setAllTotal] = useState([]);

    const navItem = [
        <NavItem key={1} path={`/class-results/${id}`} name="Full Result" />,
        <NavItem key={2} path={`/classroom-details/${id}`} name="Back to class" />,
    ]

    
    const handleGeneratePdf = () => {
      const doc = new jsPDF({
        format: 'a4',
        unit: 'pt',
        orientation: 'l'
      })

      const element = document.getElementById('main')

        doc.autoTable({html:element.children[1].children[0]})
  
        
      doc.save(`${classroom.name}-Result-Simplified`)
        
    }
    
    useEffect(() => {
        async function fetchClasses() {
            try {
                const classroomData = await getClass(id);
                setClassroom(classroomData);
                const studentsData = await getStudents(id);
                const gradeData = await getGradeSchemeList(parseInt(id)); // grading scheme
                let allResultData = []
                let allTotalData = []

                if (studentsData.length) {
                    // studentsData.map((student) => {
                    for (let i = 0; i < studentsData.length; i++) {
                        let studentResult = {
                            name: '',
                            result: []
                        }
                        const allSubjectData = await getStudentSubjects(studentsData[i].id);
                        const resultData = await studentResultCalculator(allSubjectData, gradeData)
                        studentResult.name = studentsData[i].name;
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
            if (tempResultPosition.length) {

            }

        }
        fetchClasses();
    }, [allResult]); //eslint-disable-line
    return (
        <>
            <Header title="Simplified Result" links={navItem} loggedIn={true}></Header>
           
            <main id='main' className='dark:bg-gray-700' >
            <div className='my-20  text-center dark:bg-gray-700 dark:text-green-300 text-green-300'>
            <button className=' dark:hover:bg-gray-800 hover:bg-gray-800 dark:bg-gray-500 my-2 bg-gray-700 rounded py-2 px-2' onClick={handleGeneratePdf}> Download Simplified Result</button>

            </div>
           
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                            <th ></th>
                            <th className='dark:text-yellow-400'>{classroom.name ? (classroom.name).toUpperCase(): ''} CLASS RESULTS</th>
                            <th></th>
                            <th></th>

                            </tr>
                        </thead>
                        <thead >
                            <tr className="px-6 py-3 text-center text-xs font-sm bg-blue-500 text-white dark:bg-gray-600 dark:text-yellow-400 uppercase tracking-wider">
                                <th className="px-4 py-2">Student Names</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2">Average</th>
                                <th className="px-4 py-2">Position</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-900 dark:text-white dark:bg-gray-500 divide-y divide-gray-200">

                            {/* {% for result in results %} */}
                            {
                                allPositionedResult.map((result, i) => (
                                    <tr key={i}>
                                        <td className="border px-4 py-2 ">{(result.name).toUpperCase()}</td>
                                        <td className="border px-4 py-2 text-center">{result.result[1]}</td>
                                        <td className="border px-4 py-2 text-center">{result.result[2]}</td>
                                        <td className="border px-4 py-2 text-center">{result.position}</td>
                                    </tr>
                                ))
                            }

                            {/* {% endfor %} */}
                        </tbody>
                    </table>
                </div>



            </main>

        </>
    )
}
