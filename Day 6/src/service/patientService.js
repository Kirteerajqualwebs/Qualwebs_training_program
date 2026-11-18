import mockPatients from "../data/mockPatient.jsx"

// get all patients
export function getAllPatients(){
    return mockPatients
}

// get patient by id 

export function getPatientsById(id){
    return mockPatients.filter((item)=>item.id===id)
}