import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MalePhoto from '../../../assets/male.jpg'
import FemalePhoto from '../../../assets/female.jpeg'


export default function StudentCard({ student }) {
  const [isMale, setIsMale] = useState(false);

  useEffect(() => {
    if (student.sex === "Male") {
      setIsMale(true)
    }

  }, [student])

  return (
    <>

      <div className="w-64 flex-shrink-0 mx-2 my-2">
        <div className="bg-white rounded-lg shadow-lg p-3">
          <div className="mb-4 flex justify-center">

            <img src={isMale ? MalePhoto : FemalePhoto} alt={student.name} className="w-24 h-24 object-cover rounded-full mb-4" />

          </div>
          <div className="font-medium text-lg mb-2 text-center">{student.name}</div>
          <div className='flex justify-center'>
            <Link to={`/student-details/${student.id}`} className="text-white bg-blue-600 hover:bg-blue-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">View</Link>
          </div>
        </div>
      </div>
    </>
  )
}
