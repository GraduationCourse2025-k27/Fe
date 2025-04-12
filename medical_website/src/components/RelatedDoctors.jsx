import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const RelatedDoctors = ({speciality,docId}) => {
    const{doctors} =useContext(AppContext)
    const[relDoc,setRelDoc]=useState([])
    const navigate = useNavigate

    useEffect(()=>{
        if(doctors.length>0 && speciality){
            const doctorData =doctors.filter((doc)=>doc.speciality===speciality && doc._id)
            setRelDoc(doctorData)
        }

    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-5 text-gray-900 md:mx-10'>
      <h2 className='text-3xl font-medium'>Các bác sĩ liên quan</h2>
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div 
            onClick={()=>navigate(`/appointment/${item._id}`)}
            key={index} 
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="bg-blue-50 w-full h-60 object-cover" 
            />
            <div className="p-2">
                  <span className="flex items-center gap-1 text-sm text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Hoạt động</span>
                  </span>
                  <span className="text-gray-900 text-lg font-medium block mt-1">{item.name}</span>
                  <span className="text-gray-600 text-sm block mt-1">{item.speciality}</span>
                </div>
          </div>
        ))}
      </div>
    
    </div>
    
     
  )
}

export default RelatedDoctors
