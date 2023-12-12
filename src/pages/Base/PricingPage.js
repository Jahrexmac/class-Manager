import React from 'react'
import Header from '../../components/Layouts/Header'
import Navlink from './BaseComponent/Navlinks'



export default function PricingPage() {
  const navItem = Navlink();

  return (
    <>
    <Header links={navItem} />

    <div>pricing</div>
  </>
  )
}
