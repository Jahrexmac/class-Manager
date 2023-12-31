import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import { useTitle } from "../hooks/useTitle";
import Header from '../../components/Layouts/Header';
import { useTitle } from "../../hooks/useTitle";
import login from "./LoginHandler";
import Loader from '../../components/Spinner'

export default function Login() {
    useTitle('Login')
    const [isError, setIsError] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const navItem = [];
    //   useTitle("Login");
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();

    async function handleLogin(event) {
        setIsLogin(true)
        event.preventDefault();
        try {
            const authDetail = {
                email: email.current.value,
                password: password.current.value
            }
            const data = await login(authDetail);
            data.accessToken ? navigate("/classroom") : navigate("/home");
            
        } catch (error) {
            setIsError(true)
            //   toast.error(error.message, {closeButton: true, position: "bottom-center"});
        }
    }


    return (
        <>
            <Header link={navItem} signUp={false} />
            <main className='my-20 dark:bg-gray-500'>
                <section>
                    <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Login</p>
                </section>
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input ref={email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jahrex@example.com" required autoComplete="off" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input ref={password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
                   
                </form>
                {
                    isError ?
                        <p className="my-2 bg-white rounded-md  p-2 text-center text-red-500">Incorrect Email or Password </p>
                        :
                        <>
                        {isLogin ? 
                        <div className="flex justify-center"> <Loader /></div>
                           
                            :
                            ''
                     }
                     </>
                }
                <p className="text-center dark:text-white">Dont have an account? <Link to='/register'><span className="text-green-700 dark:text-lime-300">Signup</span></Link> </p>
                </main>
        </>
    )
}
