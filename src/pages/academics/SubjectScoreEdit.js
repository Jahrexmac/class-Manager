import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { getStudents } from '../Classroom/Helper/Helper';
import { getStudent } from '../Student/Helper/Helper';
import { getStudentAssessmentList, getSubject, editAssessment, getStudentSubjects, getAllStudentSubject } from './Helper'
import {getAssessmentList} from './Helper'


export default function SubjectScoreEdit() {
    useTitle('Edit Subject')
    const { id } = useParams();
    const [assessmentList, setAssessmentList] = useState([]);
    const [subject, setSubject] = useState([]);
    const [student, setStudent] = useState([]);
    const [students, setStudents] = useState([]);
    const [classAssessment, setClassAssessment] = useState([]);


    const navigate = useNavigate();

    function getSession() {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const cmid = JSON.parse(sessionStorage.getItem("cmid"));
        return { token, cmid };
    }
    useEffect(() => {
        async function fetchClass() {
            try {
                const assessmentData = await getStudentAssessmentList(id)
                setAssessmentList(assessmentData)
                const subjectData = await getSubject(id)
                setSubject(subjectData)
                const studentData = await getStudent(subjectData.student)
                setStudent(studentData)
                const studentsData = await getStudents(studentData.classroom)
                setStudents(studentsData)
                const classAssessmentData = await getAssessmentList(studentData.classroom)
                setClassAssessment(classAssessmentData[0].assessments)
            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchClass();
    }, [id]); //eslint-disable-line

    async function handleEditScore(event) {
        const browserData = getSession();

        event.preventDefault();
        const editType = window.event.submitter.name;

        try {
            const scoreDetail = {
                name: "",
                score: 0,
                subject: subject.id,

            }
            // eslint-disable-next-line
            assessmentList.map((assessment) => {

                scoreDetail.score = parseInt(event.target[assessment.name].value);
                scoreDetail.name = assessment.name;

                editAssessment(scoreDetail, assessment.id)
            })

            if (editType === "Edit-Next-Student") {// edit next student in the row

                let nextStudentIndex = 0
                // eslint-disable-next-line
                students.map((std, i) => {
                    if (std.id === student.id) {
                        if (students.length - i === 1) {
                            nextStudentIndex = 0
                        } else {
                            nextStudentIndex = i + 1
                        }
                        // eslint-disable-next-line
                        return;
                    }
                })
                const nextStudent = students[nextStudentIndex]
                const nextStudentSubjectList = await getStudentSubjects(nextStudent.id)
                let nextStudentSubject = {}
                // eslint-disable-next-line
                nextStudentSubjectList.map((sub, i) => {
                    if (sub.name === subject.name) {
                        nextStudentSubject = nextStudentSubjectList[i]
                        // eslint-disable-next-line
                        return
                    }
                })
                browserData.token ? navigate(`/edit-subject-score/${nextStudentSubject.id}`) : navigate('/');
            } else if (editType === "Edit-Next-Subject") {
                let nextSubject = {}
                const studentAllSubject = await getAllStudentSubject(student.id)
                if (studentAllSubject.length) {
               // eslint-disable-next-line
                    studentAllSubject.map((sub, i) => {
                        if (subject.id === sub.id) {

                            if (studentAllSubject.length - i === 1) {
                                nextSubject = studentAllSubject[0]
                            }
                            else {
                                nextSubject = studentAllSubject[i + 1]
                            }

                            browserData.token ? navigate(`/edit-subject-score/${nextSubject.id}`) : navigate('/');
                            // eslint-disable-next-line
                            return

                        }
                    })
                }

            } else {
                browserData.token ? navigate(`/student-details/${subject.student}`) : navigate('/');

            }

        } catch (error) {
            //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
            // this will carry a error message cos registration failed

        }
    }


    return (
        <>
            <main>
                <br />
                <br />
                <div className="flex justify-center">
                    <h3 className="text-3xl font-bold">Edit {subject.name} Score for {student.name}</h3>
                </div>
                <form onSubmit={handleEditScore} id='new-student-form' className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6" >
                    <div className="mb-4">
                        {/* {% for assessment in assessments%} */}
                        {assessmentList.map((assessment, i) => (
                            <div key={assessment.id} >
                                <label htmlFor={assessment.name} className="block text-gray-700 font-bold mb-2">{classAssessment[i]}:</label>
                                <input type='number' defaultValue={assessment.score} name={assessment.name} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                            </div>
                        ))

                        }
                    </div>
                    {/* {% endfor %} */}

                    <div className="flex justify-around">
                        <input type="submit" name="Edit" value="Done" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 md:px-4 rounded focus:outline-none focus:shadow-outline my-2" />
                        <input type="submit" name="Edit-Next-Subject" value="Next Subject " className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-1 md:px-4 rounded focus:outline-none focus:shadow-outline my-2" />
                        <input type="submit" name="Edit-Next-Student" value="Next Student" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 md:px-4 px-1 rounded focus:outline-none focus:shadow-outline my-2" />
                    </div>
                </form>
            </main>
        </>
    )
}
