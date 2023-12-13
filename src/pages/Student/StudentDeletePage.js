import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getStudent } from './Helper/Helper';
import { deleteStudent } from './Helper/Helper';
import Header from '../../components/Layouts/Header';
import { deleteSubjectListAndAssessmentlist, getSubjectList, subjectAndAsessementDelete } from '../academics/Helper';
import { getStudents } from '../Classroom/Helper/Helper';
import { useTitle } from '../../hooks/useTitle';

export default function StudentDeletePage() {
  useTitle('Delete Student')
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectListId, setSubjectListId] = useState([]);

  const navItem = [];

  function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return { token, cmid };
  }

  useEffect(() => {
    async function fetchStudent() {
      try {
        const studentData = await getStudent(id);
        setStudent(studentData);
        const studentsData = await getStudents(studentData.classroom)
        setStudents(studentsData);
        const subjectData = await getSubjectList(studentData.classroom);
        setSubjectList(subjectData[0].subjects);
        setSubjectListId(subjectData[0].id)
      } catch (error) {
        // toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }
    }
    fetchStudent();
  }, [id]); //eslint-disable-line

  async function handleDeleteStudent(event) {
    const browserData = getSession();

    event.preventDefault();
    try {
      subjectAndAsessementDelete([student], subjectList);

      if (students.length < 2) {
        deleteSubjectListAndAssessmentlist(subjectListId);
      }
      deleteStudent(id);


      browserData.token ? navigate(`/classroom-details/${student.classroom}`) : navigate('/');
    } catch (error) {
      //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
      // this will carry a error message cos registration failed

    }
  }
  return (
    <>
      <Header link={navItem} title={student.name} loggedIn={true} />
      <main className='dark:bg-gray-400'>
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="flex justify-center">
          <h3 className="text-xl dark:text-white font-bold">Are You Sure You Want To Delete {student.name} ? </h3>
        </div>

        <form onSubmit={handleDeleteStudent}>

          <div className="flex justify-center">
            <input type="submit" name="confirm" value="confirm" className="bg-red-500 my-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
          </div>
        </form>
      </main>
    </>
  )
}
