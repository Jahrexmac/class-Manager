
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useTitle } from '../../hooks/useTitle';
import { assessmentCreator, getAssessmentList, getSubjectList } from '../academics/Helper';
import { addStudent } from './Helper/Helper';



export default function StudentAddPage() {
  useTitle('Add Student')
  const { id } = useParams();
  const [subjectList, setSubjectList] = useState([]);
  const [assessmentList, setAssessmentList] = useState([]);
  const [simpleAdd, setSimpleAdd] = useState([false])

  const navigate = useNavigate();
  const refAdd = useRef(null);
  const refAddNext = useRef(null);


  function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return { token, cmid };
  }

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


  async function handleCreateStudent(event) {
    const browserData = getSession();

    event.preventDefault();

    const addType = window.event.submitter.name;

    try {
      let studentDetail = {}
      if (!simpleAdd){
        studentDetail = {
          name: event.target.name.value,
          sex:'Nill',
          email: 'Nill',
          dob: 'Nill',
          phone: 'Nill',
          address: 'Nill',
          classroom: id
      }
    }else{
        studentDetail = {
        name: event.target.name.value,
        sex:event.target.sex.value,
        email: event.target.email.value,
        dob: event.target.date_of_birth.value,
        phone: event.target.phone_number.value,
        address: event.target.address.value,
        classroom: id
      }
    }

      const studentData = await addStudent(studentDetail);


      if (assessmentList.length) { // create subject and assessment for new student
        assessmentCreator([studentData], subjectList[0].subjects, assessmentList[0].assessments);
      }

      // create subject and assessment for new student if subject and assessment list exist


      if (addType === "add next") {
        // reset the form for new students
        if (simpleAdd){
        event.target.name.placeholder = 'First Name   Middle Name   Last Name';
        browserData.token ? navigate(`/add-student/${id}`) : navigate('/');

        }else{
        event.target.name.value = ''
        event.target.name.placeholder = 'First Name   Middle Name   Last Name';
        event.target.email.value = '';
        event.target.email.placeholder = 'email';
        event.target.date_of_birth.value = '';
        event.target.date_of_birth.placeholder = 'YYYY-MM-DD';
        event.target.phone_number.value = '';
        event.target.phone_number.placeholder = '0000000000';
        event.target.address.value = ''
        event.target.address.placeholder = '38 at john.....'
        browserData.token ? navigate(`/add-student/${id}`) : navigate('/');
        }
      } else {
        browserData.token ? navigate(`/classroom-details/${id}`) : navigate('/');

      }




    } catch (error) {
      //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
      // this will carry a error message cos registration failed

    }
  }

  return (
    <>
      <main className='dark:bg-gray-200'>
        <div className="my-10 flex justify-center">
          <h3 className="text-3xl font-bold mr-3">Add Student</h3>
          <input type="submit" onClick={()=>{setSimpleAdd(!simpleAdd)}} value={simpleAdd ? 'Simplify':'Full Details'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline" />

        </div>
        <form onSubmit={handleCreateStudent} className="max-w-md mx-auto bg-white dark:bg-gray-100 shadow-lg rounded-lg p-6">
          
          {
            simpleAdd ?
          <>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type='text' name='name' placeholder='First Name   Middle Name   Last Name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

          </div>
          <div className="mb-4">
            <label htmlFor="date_of_birth" className="block text-gray-700 font-bold mb-2">Date Of Birth:</label>
            <input type='date' name='date_of_birth' placeholder='YYYY-MM-DD' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

          </div>
          <div className="mb-4">

            <select name="sex" className="block  w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required>
              <option defaultValue="">Sex</option>
              <option defaultValue="Male">Male</option>
              <option defaultValue="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input type='email' name='email' placeholder='Email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 font-bold mb-2">Phone Number:</label>
            <input type='text' name='phone_number' maxLength='11' placeholder='00000000000' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
            <input type='text' name='address' placeholder='38 at john.....' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

          </div>
          </>
          :
          <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input type='text' name='name' placeholder='First Name   Middle Name   Last Name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

        </div>

        }

          <div className="flex justify-between">
            <input ref={refAdd} type="submit" name="add" value="Add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
            <input ref={refAddNext} type="submit" name="add next" value="Add Next" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
          </div>

        </form>

      </main>
    </>
  )
}

