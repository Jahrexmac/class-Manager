
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useTitle } from '../../hooks/useTitle';
import { editStudent, getStudent } from './Helper/Helper';




export default function StudentEditPage() {
  useTitle('Edit Student')
  const [student, setStudent] = useState([]);
  const [otherSex, setOtherSex] = useState('')
  const [bothGender, setBothGender] = useState(false)

  const { id } = useParams();
  const navigate = useNavigate();

  function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cmid = JSON.parse(sessionStorage.getItem("cmid"));
    return { token, cmid };
  }

  useEffect(() => {
    async function fetchStudent() {
      try {
        const studentDetails = await getStudent(id)
        setStudent(studentDetails)
        if(studentDetails.sex === "Male"){
          setOtherSex('Female') 
        }else if(studentDetails.sex === 'Nill'){
          setBothGender(true)
        }
        else{
          setOtherSex('Male') 
        }
      } catch (error) {
        // toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }
    }
    fetchStudent();
    

  }, [id]); //eslint-disable-line



  async function handleEditStudent(event) {
    const browserData = getSession();

    event.preventDefault();
    try {
      const studentDetail = {
        name: event.target.name.value,
        email: event.target.email.value,
        sex: event.target.sex.value,
        dob: event.target.date_of_birth.value,
        phone: event.target.phone_number.value,
        address: event.target.address.value,
        classroom: student.classroom
      }
      await editStudent(studentDetail, id);
      browserData.token ? navigate(`/student-details/${id}`) : navigate('/');
    } catch (error) {
      //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
      // this will carry a error message cos registration failed

    }
  }

  return (
    <>
      <main className='dark:bg-gray-500'>
        <div className="flex justify-center">
          <h3 className="text-3xl dark:text-white font-bold">Edit Student</h3>
        </div>
        <form onSubmit={handleEditStudent} className="max-w-md mx-auto dark:bg-gray-100 bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type='text' name='name' defaultValue={student.name} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />

          </div>
          <div className="mb-4">
            <label htmlFor="date_of_birth" className="block text-gray-700 font-bold mb-2">Date Of Birth:</label>
            <input type='date' name='date_of_birth' defaultValue={student.dob} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />

          </div>
          <div className="mb-4">

            <select name="sex" className="block  w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required>
              {
                bothGender?
                <>
                <option defaultValue='Nill'>Nill</option>
              <option defaultValue='Male'>Male</option>
              <option defaultValue='Female'>Female</option>
                </> 
                :
                <>
                 <option defaultValue={student.sex}>{student.sex}</option>
              <option defaultValue={otherSex}>{otherSex}</option>
                </>
              }
             
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input type='email' name='email' defaultValue={student.email} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />

          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 font-bold mb-2">Phone Number:</label>
            <input type='text' name='phone_number' maxLength='11' defaultValue={student.phone} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />

          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
            <input type='text' name='address' defaultValue={student.address} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />

          </div>
          <div className="flex justify-between">
            <input type="submit" name="edit" value="Edit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
          </div>

        </form>

      </main>
    </>
  )
}

