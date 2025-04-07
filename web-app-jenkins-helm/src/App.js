import logo from './logo.svg';
import React, {useState} from 'react'
import patientsData from "./data/patients"
import PatientForm from "./components/PatientForm"
import PatientList from './components/PatientList';

const App = () => {
  const [patients, setPatients]= useState(patientsData)

  React.useEffect(() => {
    console.log("Current patient IDs:", patients.map(p => p.id));
    console.log("Current length:", patients.length);
}, [patients]); // Runs whenever patients prop changes

  const  addPatient =(newPatient)=>{
    setPatients([...patients,newPatient])
  }
  
  return (
    <section>
      <PatientForm onAddPatient={addPatient} />
      <PatientList patients={patients}/>
     
    </section>
  )
}

export default App