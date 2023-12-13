
import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import logout from '../../pages/login/Logout';
import Logo from '../../assets/classMangerLogo.jpeg'


export default function Header(props) {
    const [navSmallScreen, setNavSmallScreen] = useState('true')
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);


    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {

    }, [darkMode]);



    return (
        <>

            <nav className="bg-gray-600  border-gray-300 dark:bg-gray-900 w-full fixed top-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <img src={Logo} className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center font-semibold whitespace-nowrap text-white">
                            {
                                props.title ? props.title :
                                    "Class Manager"
                            }
                        </span>
                    </Link>
                 
                    <div className="flex items-center md:order-2">

                        {props.loggedIn ?
                            <button onClick={logout} className="text-white red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center bg-red-600  mr-2">
                                <Link to='/'>Logout</Link>
                            </button>
                            :
                            <button className= {props.signUp ? "text-white  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center bg-blue-600  mr-2" : "hidden"}>
                                <Link to='/login'>Login</Link>
                            </button>
                        }

                        {/* settings icon for dark mode */}
                        <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl text-white mr-5 bi bi-gear-wide-connected"></span>

                        {/* toggle button */}

                        <button onClick={() => setNavSmallScreen(!navSmallScreen)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        {/* end of toggle button */}
                    </div>
                    {!navSmallScreen ?
                        <div className="items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-user">
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                                {/* this will hold nav item */}
                                {props.links ?
                                    props.links.map((link) => (
                                        link
                                    ))
                                    :
                                    ''
                                }

                            </ul>

                        </div>
                        :
                        <div className="items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            {/* this will hold nav item */}
                            {props.links ?
                                props.links.map((link) => (
                                    link
                                ))
                                :
                                ''
                            }

                        </ul>

                    </div>

                    }

                </div>
            </nav>

        </>
    )
}
