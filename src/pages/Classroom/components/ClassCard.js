import React from 'react'
import { Link } from 'react-router-dom'


export default function ClassCard({classRoom}) {
    return (
        <>
            <div className="w-64 flex-shrink-0 mx-4 my-2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="font-medium text-gray-900 text-lg mb-2 text-center">{classRoom.name}</div>
                    <div className="text-gray-900 mb-2">Class Teacher: {classRoom.teacher}</div>
                    <Link to={`/classroom-details/${classRoom.id}`} className="text-white bg-blue-600 hover:bg-blue-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">View</Link>
                </div>
            </div>


        </>
    )
}
