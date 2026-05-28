import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [patients, setPatients] = useState([]);

  const [editId, setEditId] = useState(null);



  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    email: '',
    glucose: '',
    haemoglobin: '',
    cholesterol: '',
    gender: ''
  });

  // Fetch Patients
  const fetchPatients = async () => {

    const res = await axios.get('http://127.0.0.1:5000/patients');

    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Form

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editId) {

      await axios.put(
        `http://127.0.0.1:5000/patients/${editId}`,
        formData
      );

      setEditId(null);

    } else {

      await axios.post(
        'http://127.0.0.1:5000/patients',
        formData
      );
    }

    fetchPatients();

    setFormData({
      full_name: '',
      dob: '',
      email: '',
      glucose: '',
      haemoglobin: '',
      cholesterol: '',
      gender: ''
    });
  };


  // Delete Patient
  const deletePatient = async (id) => {

    await axios.delete(
      `http://127.0.0.1:5000/patients/${id}`
    );

    fetchPatients();
  };


  const editPatient = (patient) => {

    setFormData({
      full_name: patient.full_name,
      gender: patient.gender,
      dob: patient.dob,
      email: patient.email,
      glucose: patient.glucose,
      haemoglobin: patient.haemoglobin,
      cholesterol: patient.cholesterol
    });

    setEditId(patient.id);
  };



  return (

    <div className="container main-container">

      <h2 className="title">
        Health Prediction Application
      </h2>

      <form
        onSubmit={handleSubmit}
        className="form-card"
      >

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="form-control mb-3"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dob"
          className="form-control mb-3"
          value={formData.dob}
          onChange={handleChange}
          required
        />


        <select
          name="gender"
          className="form-select mb-3"
          value={formData.gender}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

        </select>



        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="form-control mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="glucose"
          placeholder="Glucose (70-140 mg/dL)"
          className="form-control mb-3"
          value={formData.glucose}
          onChange={handleChange}
          required
        />
        <small className="text-muted"> Normal glucose range: 70 - 140 </small>

        <input
          type="number"
          name="haemoglobin"
          placeholder="Haemoglobin (12-17 g/dL)"
          className="form-control mb-3"
          value={formData.haemoglobin}
          onChange={handleChange}
          required
        />
        <small className="text-muted"> Normal haemoglobin range: 12 - 17 </small>

        <input
          type="number"
          name="cholesterol"
          placeholder="Cholesterol (120-240 mg/dL)"
          className="form-control mb-3"
          value={formData.cholesterol}
          onChange={handleChange}
          required
        />
        <small className="text-muted"> Normal cholesterol range: 120 - 240 </small>

        <button className="submit-btn">
          Add Patient
        </button>

      </form>

      <div className="table-card"> <table className="table table-hover">

        <thead>

          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Glucose</th>
            <th>Haemoglobin</th>
            <th>Cholesterol</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {patients.map((p) => (

            <tr key={p.id}>

              <td>{p.full_name}</td>
              <td>{p.gender}</td>
              <td>{p.email}</td>
              <td>{p.glucose}</td>
              <td>{p.haemoglobin}</td>
              <td>{p.cholesterol}</td>
              <td> { p.remarks === "Healthy" ? <span className="badge-healthy"> {p.remarks} </span> : <span className="badge-risk"> {p.remarks} </span> } </td>


              <td>

                <button
                  className="btn btn-warning action-btn me-2"
                  onClick={() => editPatient(p)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger action-btn"
                  onClick={() => deletePatient(p.id)}
                >
                  Delete
                </button>

              </td>



            </tr>

          ))}

        </tbody>

      </table>
      </div>

    </div>
  );
}

export default App;
