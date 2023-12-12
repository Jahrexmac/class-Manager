import React, { useEffect, useState } from 'react'
import { getClass } from '../Classroom/Helper/Helper';
import { useParams } from "react-router-dom";
import { addGradeScheme } from './Helper';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';

export default function GradingSchemeAdd() {
    useTitle('Add Grading Scheme')
    const { id } = useParams();
    const [classroom, setClassroom] = useState([])
    const navigate = useNavigate();


    function getSession() {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const cmid = JSON.parse(sessionStorage.getItem("cmid"));
        return { token, cmid };
    }

    useEffect(() => {
        async function fetchClass() {
            try {
                const classData = await getClass(id);
                setClassroom(classData);
            } catch (error) {
                // toast.error(error.message, {closeButton: true, position: "bottom-center" });
            }
        }
        fetchClass();
    }, []); //eslint-disable-line

    async function handleAddGradingScheme(event) {
        const browserData = getSession();
        event.preventDefault()
        const addNext = window.event.submitter.name;

        const gradeDetail = {
            start: parseInt(event.target.start.value),
            end: parseInt(event.target.end.value),
            letter: event.target.letter.value,
            remark: event.target.remark.value,
            classroom: classroom.id,
            color: (event.target.color.value === 'Select text color for this Gade') ? 'black' : `${event.target.color.value}`

        }

        addGradeScheme(gradeDetail)

        if (addNext === 'Add Next') {
            event.target.start.value = ''
            event.target.end.value = ''
            event.target.letter.value = ''
            event.target.remark.value = ''
            browserData.token ? navigate(`/add-grading-scheme/${id}`) : navigate('/');

        } else {
            browserData.token ? navigate(`/grading-scheme/${id}`) : navigate('/');
        }


    }
    return (
        <>
            <main>

                <div className="flex justify-center">
                    <h3 className="text-3xl font-bold">Add Grading Scheme </h3>
                </div>
                <form onSubmit={handleAddGradingScheme} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
                    <label htmlFor="range_start" className="block text-gray-700 font-bold mb-2">Lower Score Limit:</label>
                    <input type="number" name='start' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

                    <label htmlFor="range_end" className="block text-gray-700 font-bold mb-2">Upper Score Limit:</label>
                    <input type="number" name='end' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />


                    <label htmlFor="grade_letter" className="block text-gray-700 font-bold mb-2">Grade Letter:</label>
                    <input type="text" name='letter' maxLength={2} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

                    <label htmlFor="color" className="block text-gray-700 font-bold mb-2 my-2">Grade Color:</label>
                    <select name="color" className="block my-2 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required>
                        <option defaultValue="">Select text color for this Gade</option>
                        <option defaultValue="black">black</option>
                        <option defaultValue="red">red</option>
                    </select>
                    <label htmlFor="remark" className="block text-gray-700 font-bold mb-2">Remark:</label>
                    <input type="text" name='remark' maxLength={15} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required />

                    <div className="flex justify-between">
                        <input type="submit" name="Add" value="Add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2" />
                        <input type="submit" name="Add Next" value="Add Next" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2" />
                    </div>
                </form>

            </main>
        </>
    )
}
