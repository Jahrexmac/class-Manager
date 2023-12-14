import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { editSubjectList, getSubjectList, subjectAndAsessementDelete } from './Helper';
import Header from '../../components/Layouts/Header';
import { getClass, getStudents } from '../Classroom/Helper/Helper';
import { useNavigate } from 'react-router-dom';
import NavItem from '../../components/HeaderComponents/NavItem';
import { useTitle } from '../../hooks/useTitle';


export default function SubjectDelete() {
    useTitle('Delete Subject')
    let { id } = useParams();
    let arrayId = id.split(',')
    let studentId
    let isStudentId = false
    if(arrayId.length === 2){
        id = arrayId[0]
        studentId = arrayId[1]
        isStudentId = true
    }else{
        id = arrayId[0]
    }
    

    const [subjectList, setSubjectList] = useState([]);
    const [subjectListId, setSubjectListId] = useState([]);

    const [classroom, setClassroom] = useState([]);
    const [students, setStudents] = useState([]);
    // const [subjectDelete, setSubjectDelete] = useState([]);


  const navItem = [ <NavItem key={1} path={`/classroom-details/${id}`} name="Back to class" />,];

    const navigate = useNavigate();


    function getSession() {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const cmid = JSON.parse(sessionStorage.getItem("cmid"));
        return { token, cmid };
    }

    useEffect(() => {
        async function fetchClassData() {
            try {
                const classroom = await getClass(id);
                setClassroom(classroom);
                const subjectData = await getSubjectList(id);
                setSubjectList(subjectData[0].subjects);
                setSubjectListId(subjectData[0].id);
                const studentData = await getStudents(id);
                setStudents(studentData);
            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchClassData();
    }, [id]); //eslint-disable-line


    async function handleSubjectDelete(event) {
        const browserData = getSession();

        event.preventDefault();
        try {
            const subjectNames = [event.target.select.value] // loop

            subjectAndAsessementDelete(students, subjectNames);

           
            const subjectNewList = subjectList.filter(subject => subject !== subjectNames[0])

            const subjectDetail = {
                subjects: subjectNewList,
                classroom: id
            }
            // edit the subject list in db
            editSubjectList(subjectDetail, subjectListId,subjectList.length);

            if (isStudentId){
                browserData.token ? navigate(`/student-details/${studentId}`) : navigate('/');
            }else{
                browserData.token ? navigate(`/classroom-details/${id}`) : navigate('/');
            }

        } catch (error) {
            //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
            // this will carry a error message cos registration failed

        }
    }

    return (
        <>
            <Header title={classroom.name} links={navItem} loggedIn={true}/>
            <main className='dark:bg-gray-500'>
                <br />
                <br />
                <br />
                <br />

                <div className="flex justify-center">
                    <h3 className="text-3xl dark:text-white font-bold">Delete Subject for Class </h3>
                </div>
                <div className="max-w-md mx-auto bg-gray-300 dark:bg-white shadow-lg rounded-lg p-3 flex justify-center">
                    <form onSubmit={handleSubjectDelete} className="w-full max-w-xl  overflow-hidden  p-6 sm:p-8 md:p-10 lg:p-12 flex justify-center">
                        <div className="relative inline-block w-48 ">
                            <select name="select" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option defaultValue="">Select Subject</option>

                                {
                                    subjectList.map((subject) =>
                                        <option key={subject} defaultValue={subject}>{subject}</option> // loop

                                    )
                                }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M15 4H5a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2zM5 14V6h10l.001 8H5z" clipRule="evenodd" /></svg>
                            </div>
                        </div>
                        <div className="flex justify-begining">
                            <input type="submit" name="Delete" value="Delete" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" />
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}
