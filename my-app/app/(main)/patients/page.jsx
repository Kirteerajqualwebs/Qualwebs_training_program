import React from 'react'
import SearchPatients from './SearchPatients'


const patients =[
  {id :1  ,name :"Rahul" , age : 25},
  {id : 2 , name : "Amit", age :30},
  {id : 3, name : "Priya" , age :22},
]

const PatientsPage = () => {
  return (
    <div>
      <h1>patients List</h1>
      <SearchPatients patients={patients}/>
    </div>
  )
}

export default PatientsPage