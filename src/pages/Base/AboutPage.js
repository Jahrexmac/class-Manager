import React from 'react'
import Header from '../../components/Layouts/Header'
import { useTitle } from '../../hooks/useTitle';
import Navlink from './BaseComponent/Navlinks'



export default function AboutPage() {
  useTitle('About')
  const navItem = Navlink();
  return (
    <>
      <Header links={navItem} />

      <div>AboutPage</div>
    </>
  )
}
