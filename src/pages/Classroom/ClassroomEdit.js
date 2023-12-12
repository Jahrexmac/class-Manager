import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layouts/Header'
import { editClass } from './Helper/Helper';
import { getClass } from './Helper/Helper';
import { useParams } from "react-router-dom";
import { useTitle } from '../../hooks/useTitle';


export default function ClassroomEdit() {
  useTitle('Classroom Edit')
  const navItem = [];
  const { id } = useParams();
  const [classroom, setClassroom] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchClass(){
      try{
        const classroom = await getClass(id)
        setClassroom(classroom)
      } catch(error){
        // toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }
    }
    fetchClass();
  }, [id]); //eslint-disable-line

  function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return { token, cmid };
  }

  async function handleEditClassroom(event) {
    const browserData = getSession();

    event.preventDefault();
    try {
      const classDetail = {
        name: event.target.class_name.value,
        teacher: event.target.teacher.value,
        user: browserData.cmid
      }
      const data = await editClass(classDetail, id);
      browserData.token ? navigate(`/classroom-details/${id}`) : navigate('/');
    } catch (error) {
      //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
      // this will carry a error message cos registration failed

    }
  }

  return (
    <>
      <Header link={navItem} title={classroom.name} loggedIn={true}/>

      <main className='dark:bg-gray-500'>
        <div className="flex justify-center">
          <h3 className="text-3xl font-bold">Edit Classroom</h3>
        </div>
        <form onSubmit={handleEditClassroom} className="max-w-lg mx-auto dark:bg-gray-100 bg-white shadow-lg rounded-lg p-6 my-5">
          <div className="mb-4">
            <label htmlFor="class_name" className="block text-gray-700 font-bold mb-2">Class Name:</label>
            <input type="text" name="class_name" defaultValue={classroom.name} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
          </div>
          <div className="mb-4">
            <label htmlFor="teacher" className="block text-gray-700 font-bold mb-2">Form Teacher:</label>
            <input type="text" defaultValue={classroom.teacher} name="teacher" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>

            {/* <input type="submit" name="create" value="create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" /> */}
          </div>
        </form>

      </main>
    </>
  )
}

