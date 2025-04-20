import React from 'react'
import ConfirmAppointment from '../components/ConfirmAppointment'
import NoDoctorFound from '../components/NoDoctorFound'
import SetSuccess from '../components/SetSuccess'

const Contact = () => {
  return (
    <div className='mt-5 pt-5'>
      <ConfirmAppointment/>
      <SetSuccess/>
      <NoDoctorFound/>


    
    </div>
  )
}

export default Contact
