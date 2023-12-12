import React from 'react'
import Header from '../../components/Layouts/Header'
// import Navlink from './BaseComponent/Navlinks'

import { Link } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'

export default function HomePage() {
  useTitle('Home')
  // const navItem = Navlink();

  return (
    <>
      <Header loggedIn={false} signUp={true} />
      <main className='dark:bg-gray-500'>
        <div className="bg-gray-100 dark:bg-gray-500 min-h-screen flex items-center justify-center">
          <div className="bg-white dark:bg-gray-300 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4">Welcome to ClassManager</h1>
            <p className="text-gray-700 mb-8">
              Manage your classes and students with ease.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                <Link to='/register'>Get Started</Link>
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              <Link to='/login'>Login</Link>          
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
