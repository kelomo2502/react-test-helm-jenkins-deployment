import {patients} from "../data"

const PatientList = ({patients}) => {
  return (
    <div className="patient-list">
      <h2>Hospital Patients</h2>
      <table className="table-auto bg-red">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Weight (kg)</th>
            <th>Height (cm)</th>
            <th>Blood Type</th>
            <th>Admission Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.weight_kg}</td>
              <td>{patient.height_cm}</td>
              <td>{patient.blood_type}</td>
              <td>{patient.admission_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;