import { useEffect } from "react";

const PatientList = ({patients}) => {

    return(
        <div>
        <h1>All Patients</h1>
        <ul>
            {patients.map(patient => {
                return(
                    <li key={patient.id}>
                        <p>{patient.name}</p>
                        <p>{patient.age}</p>
                        <p>{patient.email}</p>
                        <p>{patient.bloodType}</p>
                        <p>{patient.gender}</p>
                        <p>{patient.address}</p>

                    </li>
                )
            })}
        </ul>
    </div>
    )
}


export default PatientList