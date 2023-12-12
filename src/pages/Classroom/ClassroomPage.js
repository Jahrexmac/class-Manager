import React, { useState,  useEffect  } from 'react'
import Header from '../../components/Layouts/Header'
import NavItem from '../../components/HeaderComponents/NavItem'
import ClassCard from './components/ClassCard'
import { getClasses } from './Helper/Helper'
import { useTitle } from '../../hooks/useTitle'

export default function ClassroomPage() {
  useTitle('Classroom')

  const [classRooms, setClassRooms] = useState([])

 
  useEffect(() => {
    async function fetchClasses(){
      try{
        const data = await getClasses();
        setClassRooms(data); 
      } catch(error){
        // toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }
    }
    fetchClasses();
  }, []); //eslint-disable-line


  const navItem = [<NavItem key={1} path="/create-new-class" name="New Class" />]

  return (
    <>
      <Header links={navItem} loggedIn={true}/>

      <main className='my-20 dark:bg-gray-400'>

        <div className="flex flex-wrap justify-center lg:flex-row">

          {classRooms.length ?
            classRooms.map((classRoom) => (
              <ClassCard key = {classRoom.id} classRoom = {classRoom}/>
            ))
            :
            'You Dont Have Any Class Room To Manage, Please Create A Class Room'
          } 
         

        </div>
      </main>
      {/* </div> */}
    </>
  )
}

