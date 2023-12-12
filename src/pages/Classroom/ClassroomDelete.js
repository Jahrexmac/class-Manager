import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { deleteClass, getStudents } from './Helper/Helper';
import { getClass } from './Helper/Helper';
import Header from '../../components/Layouts/Header';
import { deleteSubjectListAndAssessmentlist, getSubjectList, subjectAndAsessementDelete } from '../academics/Helper';
import { deleteStudent } from '../Student/Helper/Helper';
import NavItem from '../../components/HeaderComponents/NavItem';
import { useTitle } from '../../hooks/useTitle';


export default function ClassroomDelete() {
  useTitle('Delete Classroom')
  const { id } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectListId, setSubjectListId] = useState([]);

  const navItem = [ <NavItem key={1} path={`/classroom-details/${id}`} name="Back to class" />,];

  function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return { token, cmid };
  }

  useEffect(() => {
    async function fetchClass() {
      try {
        const classroom = await getClass(id)
        setClassroom(classroom)
        const studentsData = await getStudents(classroom.id)
        setStudents(studentsData);
        const subjectData = await getSubjectList(studentsData[0].classroom);
        setSubjectList(subjectData[0].subjects);
        setSubjectListId(subjectData[0].id)
      } catch (error) {
        // toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }
    }
    fetchClass();
  }, [id]); //eslint-disable-line

  async function handleDeleteClassroom(event) {
    const browserData = getSession();

    event.preventDefault();
    try {
      subjectAndAsessementDelete(students, subjectList);
      deleteSubjectListAndAssessmentlist(subjectListId);

      students.map((student)=>(
        deleteStudent(student.id) // delete each students
      ))

      deleteClass(id);
      browserData.token ? navigate("/classroom") : navigate('/');
    } catch (error) {
      //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
      // this will carry a error message cos registration failed

    }
  }
  return (
    <>
      <Header  title={classroom.name} links={navItem} loggedIn={true}/>
      <main className='dark:bg-gray-400'>
        <br />
        <br />
        <br />
        <br />

        <div className="flex justify-center">
          <h3 className="text-3xl dark:text-white font-bold my-5">Are You Sure You Want To Delete {classroom.name} </h3>
        </div>
        <br />
        <form onSubmit={handleDeleteClassroom}>
          <div className="flex justify-center">
            <input type="submit" name="confirm" value="confirm" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
          </div>
        </form>
      </main>
    </>
  )
}
