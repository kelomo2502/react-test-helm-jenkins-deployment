import logo from './logo.svg';
import React from 'react'
import PatientList from "./pages/PatientList"

const App = () => {
  return (
    <div className='flex justify-center bg-blue-600'>
      <PatientList/>
    </div>
  )
}

export default App