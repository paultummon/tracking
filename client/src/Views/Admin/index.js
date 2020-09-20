import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Admin.module.css'
import MapView from '../../components/MapView'
import Slider from '../../components/Slider'

const constructPatientForm = (updateStaffField, renderPatientBoundaries, patients, renderMapMarkers, staffList, updatePatientLocation, patientMarker ) => {
  return (
    <section className={styles.formContainer}>
      <section className={styles.form}>
      <div className={styles.registrationForm}>
        <div className={styles.titleContainer}><h1>Create Patient</h1></div>
        <label for='name'>Name: <input name='name' onChange={updateStaffField} id='name' /></label>
        <label for='roamingDistance'>Roaming Range: <input name='roamingDistance' onChange={updateStaffField} id='roamingDistance' /></label>
        <label for='contactNo'>Contact No: <input name='contactNo' onChange={updateStaffField} id='contactNo' /></label>
        <label for='locationLat'>Location Lat: <input disabled name='locationLat' value={patientMarker.lat}onChange={updateStaffField} id='locationLat' /></label>
        <label for='locationLng'>Location Lng: <input disabled name='locationLng' value={patientMarker.lng}onChange={updateStaffField} id='locationLng' /></label>
        <button>Submit</button>
      </div>
      </section>
      <section className={styles.mapContainer}>
          <MapView onMarkerClick={(e) => console.log(e)} defaultZoom={10} renderPatientBoundaries={renderPatientBoundaries} patients={patients} renderMapMarkers={renderMapMarkers} staffList={staffList} updateLocation={updatePatientLocation}/>
      </section>
    </section>
  )
}

const constructStaffForm = (updateStaffField, renderPatientBoundaries, patients, renderMapMarkers, staffList, updatePatientLocation, patientMarker ) => {
  return (
    <section className={styles.formContainer}>
      <section className={styles.form}>
      <div className={styles.registrationForm}>
        <div className={styles.titleContainer}><h1>Create Staff</h1></div>
        <label for='firstName'>First Name: <input name='firstName' onChange={updateStaffField} id='firstName' /></label>
        <label for='lastName'>Last Name: <input name='lastName' onChange={updateStaffField} id='lastName' /></label>
        <label for='contactNo'>Contact No: <input name='contactNo' onChange={updateStaffField} id='contactNo' /></label>
        <label for='locationLat'>Location Lat: <input disabled name='locationLat' value={patientMarker.lat}onChange={updateStaffField} id='locationLat' /></label>
        <label for='locationLng'>Location Lng: <input disabled name='locationLng' value={patientMarker.lng}onChange={updateStaffField} id='locationLng' /></label>
        <button>Submit</button>
      </div>
      </section>
      <section className={styles.mapContainer}>
          <MapView onMarkerClick={(e) => console.log(e)} defaultZoom={10} renderPatientBoundaries={renderPatientBoundaries} patients={patients} renderMapMarkers={renderMapMarkers} staffList={staffList} updateLocation={updatePatientLocation}/>
      </section>
    </section>
  )
}



const AdminView = (props) => {
  const [panel, setPanel] = useState('')
  const [patientForm, setPatientFormState] = useState({ name: '', roamingDistance: '', emergencyContact: '', emergencyContactNo: '', roamingRadius: '' })
  const [staffForm, setStaffFormState] = useState({ firstName: '', lastName: '', contactNo: '', locationLat: '', locationLng: '' })
  const [patientMarker, updatePatientMarker] = useState({lat: '', lng: ''})
  const updatePatientField = e => {
    setPatientFormState({
      ...patientForm,
      [e.target.name]: e.target.value
    })
  }

  const updatePatientLocation = e => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    updatePatientMarker({
      lat,
      lng
    })
  }
  
  const patients = []

  const staffList = []

  const renderPatientBoundaries = ( ) => {

  }

  const renderMapMarkers = () => {

  }

  const updateStaffField = e => {
    setStaffFormState({
      ...staffForm,
      [e.target.name]: e.target.value
    })
    console.log('THIS IS STAFFFORM NOW ====>', staffForm)
  }
  let sliderArr = [constructPatientForm(updateStaffField, renderPatientBoundaries, patients, renderMapMarkers, staffList, updatePatientLocation, patientMarker ),constructStaffForm(updateStaffField, renderPatientBoundaries, patients, renderMapMarkers, staffList, updatePatientLocation, patientMarker )]

  const { auth: {user: {name, admin}} } = props
  return (
    <div className={styles.adminContainer}>
                {Boolean(admin) && <Slider>
                  {sliderArr}
                  </Slider>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
})

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({ loadLoggedInUserDetails: loadLoggedInUserDetails }, dispatch)
// }

export default connect(mapStateToProps, null)(AdminView)

{/* <div className={styles.registerContainer}>
          <div className={styles.registrationForm}>
            <div className={styles.titleContainer}><h1>Create Patient</h1></div>
            <label for='firstName'>First Name:</label><input name='firstName' onChange={updatePatientField} id='firstName' />
            <label for='lastName'>Last Name:</label><input name='lastName' onChange={updatePatientField} id='lastName' />
            <label for='emergencyContact'>Emergency Contact:</label><input name='emergencyContact' onChange={updatePatientField} id='emergencyContact' />
            <label for='emergencyContactNo'>Emergency Contact No:</label><input name='emergencyContactNo' onChange={updatePatientField} id='emergencyContactNo' />
            <label for='baseLocation'>Base Location:</label><input id='baseLocation' />
            <label for='roamingRadius'>Roaming Radius:</label><input id='roamingRadius' name='roamingRadius' onChange={updatePatientField} />
          </div>
        </div> */}
