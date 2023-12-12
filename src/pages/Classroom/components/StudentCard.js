import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MalePhoto from '../../../assets/male.png'
import FemalePhoto from '../../../assets/female.png'
import Unisex from '../../../assets/unisex.png'


export default function StudentCard({ student }) {
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false)
  const [isUnisex, setIsUnisex] = useState(false)

  useEffect(() => {
    if (student.sex === "Male") {
      setIsMale(true)
    }else if (student.sex === "Female"){
      setIsFemale(true)
    }else{
      setIsUnisex(true)
    }

  }, [student])

  return (
    <>

      <div className="w-64 flex-shrink-0 mx-2 my-2">
        <div className="bg-white rounded-lg shadow-lg p-3">
          
            {
              isMale ? 
              <div className="mb-4 flex justify-center">
            <img src={MalePhoto} alt={student.name} className="w-24 h-24 object-cover rounded-full mb-4" />
            </div>
            :<></>

            }
            {
              isFemale ? 
              <div className="mb-4 flex justify-center">
            <img src={FemalePhoto} alt={student.name} className="w-24 h-24 object-cover rounded-full mb-4" />
            </div>
            :<></>

            }
            {
              isUnisex ? 
              <div className="mb-4 flex justify-center">
            <img src={Unisex} alt={student.name} className="w-24 h-24 object-cover rounded-full mb-4" />
            </div>
            :<></>

            }


          <div className="font-medium text-lg mb-2 text-center">{student.name}</div>
          <div className='flex justify-center'>
            <Link to={`/student-details/${student.id}`} className="text-white bg-blue-600 hover:bg-blue-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">View</Link>
          </div>
        </div>
      </div>
    </>
  )
}
