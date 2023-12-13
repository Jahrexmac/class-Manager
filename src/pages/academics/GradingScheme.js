import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Layouts/Header'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { deleteGradingScheme, getGradeSchemeList } from './Helper';
import NavItem from '../../components/HeaderComponents/NavItem';
import { getClass } from '../Classroom/Helper/Helper';
import { useTitle } from '../../hooks/useTitle';


export default function GradingScheme() {
    useTitle("Grading Scheme");

    const { id } = useParams();
    const [grades, setGrades] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const navItem = [<NavItem key={1} path={`/classroom-details/${id}`} name="Back to class" />];
    const redText = `px-3 py-4 text-center whitespace-nowrap text-sm font-medium text-red-600`;
    const blackText = `px-3 py-4 text-center whitespace-nowrap text-sm font-medium`;
    const navigate = useNavigate();
    


    function getSession() {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const cmid = JSON.parse(sessionStorage.getItem("cmid"));
        return { token, cmid };
    }

    useEffect(() => {
        async function fetchGradeScheme() {
            try {
                const classData = await getClass(id);
                setClassroom(classData);
                const gradeData = await getGradeSchemeList(id);
                setGrades(gradeData);

            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchGradeScheme();
    }, [id]); //eslint-disable-line
    async function handleGradeSchemeDelete(event) {
        const browserData = getSession();
        const gradeId = event.target.gradeId.value;
        deleteGradingScheme(gradeId)

        browserData.token ? navigate(`/grading-scheme/${id}`) : navigate('/');
    }

    return (
        <>
            <Header title={classroom.name} links={navItem} loggedIn={true}/>

            <main className='dark:bg-gray-400'>
                <br />
                <br />
                <br />

                <div className="flex justify-center">
                    <h3 className="text-3xl font-bold dark:text-white">Class Grading Scheme</h3>
                </div>
                <div className="max-w-lg overflow-x-auto mx-auto dark:bg-gray-200 bg-white shadow-lg rounded-lg p-3">
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className={`px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                                    Score Range
                                </th>
                                <th scope="col" className={`px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                                    Grade Letter
                                </th>
                                <th scope="col" className={`px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                                    Remark
                                </th>
                                <th scope="col" className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>

                                </th>
                                
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {grades.length ?
                                grades.map((grade) => (

                                    <tr key={grade.id}>

                                        <td className={grade.color === 'red'? redText : blackText}> 
                                            {grade.start} - {grade.end}
                                        </td>
                                        <td className={grade.color === 'red'? redText : blackText}>
                                            {grade.letter}
                                        </td>
                                        <td className={grade.color === 'red'? redText : blackText}>
                                            {grade.remark}
                                        </td>

                                        <td className=" flex items-baseline">
                                            <Link to={`/edit-grading-scheme/${grade.id}`} className="text-white bg-yellow-600 text-white hover:bg-yellow-200 hover:text-gray-900 px-2 py-2 rounded-md text-sm font-medium mr-2 my-2">Edit</Link>
                                            <form onSubmit={handleGradeSchemeDelete}>
                                                <input type='text' name='gradeId' defaultValue={grade.id} className='hidden'></input>
                                                <input type="submit" onSubmit={handleGradeSchemeDelete} name='Delete' value='Delete' className="text-white bg-red-600 text-white hover:bg-red-200 hover:text-gray-900 px-2 py-2 rounded-md text-sm font-medium my-2 mr-2" />
                                            </form>
                                        </td>
                                    </tr>
                                ))

                                :
                                <tr>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Nill
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                        Nill
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Nill
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                    {
                        grades.length
                            ?

                            <div className="flex items-baseline justify-center">
                                <Link to={`/add-grading-scheme/${id}`} className=" text-white bg-green-500 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium my-2">Add Another</Link>
                            </div>
                            :
                            <div className="flex items-baseline justify-center">
                                <Link to={`/add-grading-scheme/${id}`} className=" text-white bg-green-500 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Add Grading Scheme</Link>
                            </div >
                    }

                </div >
            </main >
        </>
    )
}
