
import React, { useState, useEffect } from 'react'
import Header from '../../components/Layouts/Header'
import NavItem from '../../components/HeaderComponents/NavItem'
import StudentCard from './components/StudentCard'
import { useParams } from "react-router-dom";
import { getStudents } from './Helper/Helper'
import { getClass } from './Helper/Helper';
import { useTitle } from '../../hooks/useTitle';
import { getSubjectList } from '../academics/Helper';


export default function ClassroomDetail() {
  useTitle('Classroom Details')
  const [classroom, setClassroom] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const { id } = useParams();


  useEffect(() => {
    async function fetchClass() {
      try {
        const classroom = await getClass(id)
        setClassroom(classroom)
        const subjectData = await getSubjectList(id)
        setSubjects(subjectData)
        // console.log(subjectData)
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

  let navItem = []
  if (students.length > 0 && subjects.length > 0) {
    navItem = [
      <NavItem key={1} path="/classroom" name="Back" />,
      <NavItem key={2} path={`/add-student/${id}`} classId={id} name="+ Student" />,
      <NavItem key={3} path={`/edit-classroom/${id}`} name="Edit" />,
      <NavItem key={4} path={`/delete-classroom/${id}`} name="Delete" />,
      <NavItem key={5} path={`/add-subject/${id}`} name="+ Subject" />,
      <NavItem key={6} path={`/delete-subject/${id}`} name="- Subject" />,
      <NavItem key={7} path={`/grading-scheme/${id}`} name="Grading" />,
      <NavItem key={8} path={`/class-results/${id}`} name="Results" />,
    ]
  } else if (students.length > 0 && subjects.length === 0) {
    navItem = [
      <NavItem key={1} path="/classroom" name="Back" />,
      <NavItem key={2} path={`/add-student/${id}`} classId={id} name="+ Student" />,
      <NavItem key={3} path={`/edit-classroom/${id}`} name="Edit" />,
      <NavItem key={4} path={`/delete-classroom/${id}`} name="Delete" />,
      <NavItem key={5} path={`/add-subject/${id}`} name="+ Subject" />,
      <NavItem key={6} path={`/delete-subject/${id}`} name="- Subject" />,
      <NavItem key={7} path={`/grading-scheme/${id}`} name="Grading" />,
    ]
  } else {
    navItem = [
      <NavItem key={1} path="/classroom" name="Back" />,
      <NavItem key={2} path={`/add-student/${id}`} classId={id} name="+ Student" />,
      <NavItem key={3} path={`/edit-classroom/${id}`} name="Edit" />,
      <NavItem key={4} path={`/delete-classroom/${id}`} name="Delete" />,
    ]


  }
  return (
    <>
      <Header links={navItem} title={classroom.name} loggedIn={true} />

      <main className=' my-20 dark:bg-gray-400'>
        <div ><span className='bg-gray-500  rounded py-2 px-2 text-white'>Students: {students.length} </span> </div>
        <br></br>
        <div className="flex flex-wrap justify-center lg:flex-row">

          {students.length ?
            students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))
            :
            'You Dont Have Any Student In This Class Room, Please Add Students'
          }


        </div>
      </main>
      {/* </div> */}
    </>
  )
}

