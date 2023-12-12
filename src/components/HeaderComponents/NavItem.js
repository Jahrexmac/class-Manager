import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";


export default function NavItem(props) {
    const activeClass = "text-base block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white";
    const inActiveClass = "text-base block py-2 pr-4 pl-3 text-white rounded hover:text-gray-900 md:hover:bg-transparent md:p-0  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
    const [isHomePage, setIsHomepage] = useState(false);


    useEffect(() => {
        if (props.path === '/') {
            setIsHomepage(true);
        } else {
            setIsHomepage(false);
        }

    }, [props.path]);

    return (

        <li>
            {isHomePage ? <NavLink to={props.path} className={({ isActive }) => isActive ? activeClass : inActiveClass} aria-current="page" end>{props.name}</NavLink>
                :
                <NavLink to={props.path} className={({ isActive }) => isActive ? activeClass : inActiveClass} aria-current="page">{props.name}</NavLink>
            }
        </li>


    )
}
