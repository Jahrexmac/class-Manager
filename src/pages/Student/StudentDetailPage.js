import React, { useState, useEffect } from 'react'
import Header from '../../components/Layouts/Header'
import NavItem from '../../components/HeaderComponents/NavItem'
import { Link, useParams } from "react-router-dom";
import { getStudent, studentResultCalculator } from './Helper/Helper';
import { getClass, getStudents } from '../Classroom/Helper/Helper';
import { getAssessmentList, getGradeSchemeList, getStudentSubjects, getSubjectList } from '../academics/Helper';
import MalePhoto from '../../assets/male.png'
import FemalePhoto from '../../assets/female.png'
import Unisex from '../../assets/unisex.png'
import { useTitle } from '../../hooks/useTitle';
import Loader from '../../components/Spinner'


export default function StudentDetailPage() {
  useTitle('Student Details')
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [classroom, setClassroom] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [assessmentList, setAssessmentList] = useState([]);
  const [subjectResult, setSubjectResult] = useState([]);
  const [moreStudent, setMoreStudent] = useState(false);
  const [nextStudent, setNextStudent] = useState({});
  const [prevStudent, setPrevStudent] = useState({});
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false)
  const [isUnisex, setIsUnisex] = useState(false)
  const [grandTotal, setGrandTotal] = useState(0);
  const [averageTotal, setAverageTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  // const [grades, setGrades] = useState([]);

  const gradeRed = "px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500 dark:text-red-500"
  const gradeblack = "px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-900"




  const navItem = [
    <NavItem key={1} path={`/edit-student/${id}`} name="Edit Info" />,
    <NavItem key={2} path={`/delete-student/${id}`} name="Delete" />,
    <NavItem key={3} path={`/classroom-details/${student.classroom}`} name="Back to class" />,

  ]

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const studentDetails = await getStudent(id);
        if (studentDetails.sex === 'Male') {
          setIsMale(true)
          setIsFemale(false)
          setIsUnisex(false)

        } else if (studentDetails.sex === 'Female') {
          setIsFemale(true)
          setIsUnisex(false)
          setIsMale(false)

        } else {
          setIsUnisex(true)
          setIsFemale(false)
          setIsMale(false)

        }
        const gradeData = await getGradeSchemeList(parseInt(studentDetails.classroom)); // grading scheme
        setStudent(studentDetails);
        const classroom = await getClass(studentDetails.classroom);
        setClassroom(classroom);
        const subjectListData = await getSubjectList(studentDetails.classroom);
        setSubjectList(subjectListData[0].subjects);
        const assessmentListData = await getAssessmentList(studentDetails.classroom);
        setAssessmentList(assessmentListData[0].assessments);
        const allSubjectData = await getStudentSubjects(id);
        const studentsDetails = await getStudents(studentDetails.classroom);// retrieves all student in class

        const resultData = await studentResultCalculator(allSubjectData, gradeData)
        if(resultData.length){
          setIsLoading(false)
        }
        setSubjectResult(resultData[0])

        if (studentsDetails.length > 1) {
          setMoreStudent(true);
          // eslint-disable-next-line
          studentsDetails.map((std, i) => {
            if (std.id === studentDetails.id) {
              if (studentsDetails.length - i === 1) {
                setNextStudent(studentsDetails[0]);
                setPrevStudent(studentsDetails[i - 1]);

              } else if (studentsDetails.length - i === studentsDetails.length) {
                setPrevStudent(studentsDetails[studentsDetails.length - 1]);
                setNextStudent(studentsDetails[i + 1]);
              } else {
                setNextStudent(studentsDetails[i + 1]);
                setPrevStudent(studentsDetails[i - 1]);
              }
              // eslint-disable-next-line
              return
            }
          })
        }
        // const resultData = await studentResultCalculator(allSubjectData, grades)

        setGrandTotal(resultData[1])
        setAverageTotal((resultData[1] / allSubjectData.length).toFixed(2));

        // setSubjectResult(resultData[0])

      } catch (error) {
        // toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }
    }
    fetchStudentData();
    if (nextStudent.sex !== 'Male' && nextStudent.sex !== 'Nill') {
      setIsMale(false)
      setIsUnisex(false)
      setIsFemale(true)
    } else if (nextStudent.sex !== 'Female' && nextStudent.sex !== 'Nill') {
      setIsMale(true)
      setIsUnisex(false)
      setIsFemale(false)
    } else {
      setIsMale(false)
      setIsUnisex(true)
      setIsFemale(false)
    }

    if (prevStudent.sex !== 'Male' && prevStudent.sex !== 'Nill') {
      setIsMale(false)
      setIsUnisex(false)
      setIsFemale(true)
    } else if (prevStudent.sex !== 'Female' && prevStudent.sex !== 'Nill') {
      setIsMale(true)
      setIsUnisex(false)
      setIsFemale(false)
    } else {
      setIsMale(false)
      setIsUnisex(true)
      setIsFemale(false)
    }

  }, [id]); //eslint-disable-line


  return (
    <>
      <Header links={navItem} title={classroom.name ? (classroom.name).toUpperCase() : ''} loggedIn={true} />
      <main className='my-20 dark:bg-gray-400 dark:text-white' >
        <>
          {
            isLoading ?
              <Loader />
              :
              <>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  {
                    moreStudent ?
                      <div className="flex  justify-between">
                        <Link to={`/student-details/${prevStudent.id}`} className="text-white bg-yellow-600 text-white hover:bg-yellow-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium mr-4">Prev</Link>
                        <Link to={`/student-details/${nextStudent.id}`} className="text-white bg-green-600 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Next</Link>
                      </div>
                      :
                      <></>
                  }

                </div>
                <div>
                  {
                    isMale ?
                      <div className="flex flex-col items-center">
                        <img src={MalePhoto} alt={student.name} className="w-40 h-40 object-cover rounded-full mb-4" />
                      </div>
                      : <></>

                  }
                  {
                    isFemale ?
                      <div className="flex flex-col items-center">
                        <img src={FemalePhoto} alt={student.name} className="w-40 h-40 object-cover rounded-full mb-4" />
                      </div>
                      : <></>

                  }
                  {
                    isUnisex ?
                      <div className="flex flex-col items-center">
                        <img src={Unisex} alt={student.name} className="w-40 h-40 object-cover rounded-full mb-4" />
                      </div>
                      : <></>
                  }
                </div>
                <br />
                <h3 className="text-lg leading-6 font-medium text-center "><span className='p-2 rounded-md text-white dark:text-pink-300 bg-gray-900'>{student.name ? (student.name).toUpperCase() : ''}</span></h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 mt-4 ">
                  <div className="sm:col-span-1 ">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white">Classroom:</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{classroom.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white">Date of Birth:</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.dob}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white">Sex:</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.sex}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white">Email:</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white">Phone Number:</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.phone}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white">Address:</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.address}</dd>
                  </div>
                </dl>
                {/* <!--  academic details--> */}
                <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-green-100 text-center mt-8"><span className='bg-gray-900 text-white rounded-md p-2'>ACADEMIC DETAILS</span></h4>
                <br />
                <div className='flex justify-end'>
                  {/* <p className="text-white bg-blue-600 text-white  px-3 py-2 rounded-md text-sm font-medium mr-4">Position: 1st</p> */}
                  <p className="text-white bg-blue-600 text-white  px-3 py-2 rounded-md text-sm font-medium mr-4">Total: {grandTotal}</p>
                  <p className="text-white bg-blue-600 text-white  px-3 py-2 rounded-md text-sm font-medium mr-4">Average: {averageTotal}</p>
                </div>

                {/* {% if subjects %} check if subject in class */}
                {subjectList.length ?
                  <>

                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                              S/N
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                              Subject
                            </th>


                            {/* {% for data in table%} for table head */}
                            {assessmentList.length ?
                              assessmentList.map((assessment, i) => (
                                <th key={assessment} scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-yellow-400 text-gray-500 uppercase tracking-wider">
                                  {assessment}
                                </th>
                              )) :
                              <th></th>
                            }

                            {/* {% endfor %} */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                              Grade
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                              Remark
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">

                            </th>
                          </tr>
                        </thead>

                        {/* {% for item in subjects %} for individual subject and its info */}


                        <tbody className="bg-white dark:bg-gray-200 divide-y divide-gray-200">

                          {subjectResult.map((result) => (
                            <tr key={result.sn}>
                              <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                {result.sn}
                              </td>
                              <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                {result.subject ? (result.subject).toUpperCase() : ''}
                              </td>
                              {/* loop the scores for assessment */}
                              {result.assessment.map((score, i) => (
                                <td key={Math.random() * 100} className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                  {score}
                                </td>
                              ))

                              }
                              {/* end of scores loop */}
                              <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                {result.total}
                              </td>
                              <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                {result.gradeLetter}
                              </td>
                              <td className={result.gradeColor === 'red' ? gradeRed : gradeblack}>
                                {result.remark}
                              </td>

                              <td className="ml-10 flex items-baseline">
                                <Link to={`/edit-subject-score/${result.subjectId}`} className="bg-yellow-600 text-white hover:bg-yellow-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium mr-4 my-2">Edit</Link>
                              </td>
                            </tr>
                          ))

                          }

                        </tbody>
                        {/* end of loop */}
                      </table>
                    </div>
                  </> :
                  <>
                    <br />
                    <br />
                    <div>
                      <h6 className='text-center text-red-800'> No Assessment Record, Please enter subjects and assessment for this student</h6>
                    </div>
                  </>
                }
              </>
          }
        </>
      </main>
    </>
  )
}
