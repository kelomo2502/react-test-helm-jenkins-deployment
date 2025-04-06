import {useState} from "react"

const PatientForm = ({onAddPatient}) => {
    const [formData, setFormData] = useState({
      name: "",
      age: "",
      email: "",
      bloodType: "",
      gender: "",
      address: ""
    })

    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    const handleSubmit =(e)=> {
        e.preventDefault()
        const newPatient = {
            id: Date.now(),
            ...formData,
            age: Number(formData.age)
        }
        onAddPatient(newPatient)
        setFormData({
            name: "",
            age: "",
            email: "",
            bloodType: "",
            gender: "",
            address: ""
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Patient Registration Form</h1>
            <input name="name" value={formData.name} placeholder="Name" onChange={handleChange} required/>
            <input name="age" value={formData.age} placeholder="Age" onChange={handleChange} required/>
            <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} required/>
            <input name="bloodType" value={formData.bloodType} placeholder="Blood Type" onChange={handleChange} required/>
            <input name="gender" value={formData.gender} placeholder="Gender" onChange={handleChange} required/>
            <input name="address" value={formData.address} placeholder="Address" onChange={handleChange} required/>
            <button type="submit">Add Patient</button>
        </form>
    )
}

export default PatientForm