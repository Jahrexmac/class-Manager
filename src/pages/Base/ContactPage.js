import React from 'react'
import Header from '../../components/Layouts/Header'
import { useTitle } from '../../hooks/useTitle';
import Navlink from './BaseComponent/Navlinks'



export default function ContactPage() {
  useTitle('Contact Us')
  const navItem = Navlink();

  return (
    <>
    <Header links={navItem} />

    <div>Contact</div>
  </>
  )
}
