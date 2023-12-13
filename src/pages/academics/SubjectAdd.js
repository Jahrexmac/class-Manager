import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getClass, getStudents } from '../Classroom/Helper/Helper';
import { addAssessmentList, addSubjectList, assessmentCreator, editSubjectList, getAssessmentList, getSubjectList } from './Helper';
import { useTitle } from '../../hooks/useTitle';

export default function SubjectAdd() {
    useTitle('Add Subject')
    const { id } = useParams();
    // eslint-disable-next-line
    const [classroom, setClassroom] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [assessmentList, setAssessmentList] = useState([]);

    const hideAssessmentInfo = "text-gray-600 hidden";
    const hideAssessmentInput = "mb-6 hidden";
    const labelAssessment = "block text-gray-700 font-bold mb-2";
    const hideLabelAssessment = "block text-gray-700 font-bold mb-2 hidden";
    const textareaAssessment = "w-full border border-gray-400 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    const hideTextareaAssessment = "w-full border border-gray-400 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 hidden"
    const AssessmentInfo = "text-gray-600";
    const AssessmentInput = "mb-6";
    const navigate = useNavigate();

    function getSession() {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const cmid = JSON.parse(sessionStorage.getItem("cmid"));
        return { token, cmid };
    }
    useEffect(() => {
        async function fetchClass() {
            try {
                const classroomData = await getClass(id)
                setClassroom(classroomData)
            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchClass();
    }, [id]); //eslint-disable-line


    useEffect(() => {
        async function fetchStudents() {
            try {
                const data = await getStudents(id);
                setStudents(data);
            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchStudents();
    }, []); //eslint-disable-line


    useEffect(() => {
        async function fetchSubjectList() {
            try {
                const data = await getSubjectList(id);
                setSubjectList(data);
            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchSubjectList();
    }, []); //eslint-disable-line

    useEffect(() => {
        async function fetchAssessmentList() {
            try {
                const data = await getAssessmentList(id);
                setAssessmentList(data);

            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchAssessmentList();
    }, []); //eslint-disable-line



    async function handleCreateAssessment(event) {
        const browserData = getSession();
        let assessmentRaw = ''
        let assessmentListForm = []

        event.preventDefault();

        const subjectsRaw = event.target.subjects.value;
        let subjectListFormRaw = subjectsRaw.split(',');
        let subjectListForm = [];


        subjectListFormRaw.map((subject) =>
            subjectListForm.push(subject.trim()) // removes space

        )
        subjectListForm = [...new Set(subjectListForm)];


        if (assessmentList.length === 0) {
            assessmentRaw = event.target.assessments.value;
            let assessmentListFormRaw = assessmentRaw.split(',')

            assessmentListFormRaw.map((assessment) =>
                assessmentListForm.push(assessment.trim()) // removes space

            )
            assessmentListForm = [...new Set(assessmentListForm)];
        }

        if (assessmentList.length === 0) {
            assessmentCreator(students, subjectListForm, assessmentListForm);
            addSubjectList(subjectListForm, id); // creates a list of subject for the class for future students
            addAssessmentList(assessmentListForm, id); // creates a list of assessment for the class for future students
        } else {
            const subjectDetail = {
                subjects: subjectList[0].subjects.concat(subjectListForm),
                classroom: id
            }
            assessmentCreator(students, subjectListForm, assessmentList[0].assessments); // this condition is because there exist a class assessment
            editSubjectList(subjectDetail, subjectList[0].id) // this updates existing subject list for class
        }
        browserData.token ? navigate(`/classroom-details/${id}`) : navigate('/');
    }


    return (
        <main className='dark:bg-gray-400'>

            <div className="flex flex-col items-center justify-center min-h-screen">
                <h3 className="text-xl dark:text-white font-bold mb-6">{assessmentList.length ? "Add Subject(s)" : "Add Subject(s) and Assessment(s)"}</h3>
                <form onSubmit={handleCreateAssessment} className="w-full max-w-xl bg-white rounded-lg overflow-hidden shadow-md p-6 sm:p-8 md:p-10 lg:p-12">
                    <div className="mb-6">
                        <label forhtml="subjects" className="block text-gray-700 font-bold mb-2">Subjects:</label>
                        <textarea id="subjects" placeholder='e.g   Maths, English, Chemistry' name="subjects" rows="3" className="w-full border border-gray-400 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                    </div>
                    <div className={assessmentList.length ? hideAssessmentInput : AssessmentInput}>
                        <label forhtml="assessments" className={assessmentList.length ? hideLabelAssessment : labelAssessment}>Assessments:</label>
                        {assessmentList.length ?

                            ''
                            :
                            <textarea name="assessments" rows="3" placeholder='e.g    First Test, Second Test, Exam' className={assessmentList.length ? hideTextareaAssessment : textareaAssessment} required></textarea>

                        }

                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-600 mb-2">

                            Enter a list of or a single subject for students in the class. If the subject
                            is more than one, it should be separated with a comma (,).
                        </p>
                        <p className={!assessmentList.length ? hideAssessmentInfo : AssessmentInfo}><span className='text-red-500'>Note: If you want to remove the assessment types, simply remove all the subject</span></p>
                        <p className={assessmentList.length ? hideAssessmentInfo : AssessmentInfo}>
                            Enter the assessment types for the class (e.g., first test, second test, exam, etc.).
                            Note: enter the assessments in the order they should appear on the class result, and you can enter as many assessments as possible.
                        </p>
                    </div>
                </form>
            </div>
        </main>
    )
}
