import logo from './logo.svg';
import React, {useState} from 'react'
import patientsData from "./data/patients"
import PatientForm from "./components/PatientForm"
import PatientList from './components/PatientList';

const App = () => {
  const [patients, setPatients]= useState(patientsData)
  console.log(patients)

  const  addPatient =(newPatient)=>{
    setPatients([...patients,newPatient])
  }
  
  return (
    <section>
      <PatientForm onAddPatient={addPatient}/>
      <PatientList patients={patients}/>
     
    </section>
  )
}

export default App