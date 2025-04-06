import logo from './logo.svg';
import React from 'react'
import PatientList from "./pages/PatientList"

const App = () => {
  return (
    <div className='flex justify-center items-center'>
      <PatientList/>
    </div>
  )
}

export default App