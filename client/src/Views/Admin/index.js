import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Admin.module.css'
import MapView from '../../components/MapView'
import Slider from '../../components/Slider'
import ImgComp from '../../components/Slider/ImgComp'
import i1 from '../../imgs/care.jpg'
import i2 from '../../imgs/careHome.jpg'
import i3 from '../../imgs/carehome2.jpg'
import i4 from '../../imgs/patientCare.jpg'

const AdminView = (props) => {
  const [panel, setPanel] = useState('')
  const [patientForm, setPatientFormState] = useState({ firstName: '', lastName: '', emergencyContact: '', emergencyContactNo: '', roamingRadius: '' })
  const [staffForm, setStaffFormState] = useState({ firstName: '', lastName: '', contactNo: '', location: '' })
  const [patientMarker, updatePatientMarker] = useState({lat: '', lng: ''})
  const updatePatientField = e => {
    setPatientFormState({
      ...patientForm,
      [e.target.name]: e.target.value
    })
  }
  let sliderArr = [<ImgComp src={i1}/>,<ImgComp src={i2}/>,<ImgComp src={i3}/>,<ImgComp src={i4}/>]

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
  }
  const { auth: {user: {name, admin}} } = props
  return (
    <div className={styles.adminContainer}>
      {/* <div className={styles.adminNav}> */}
        {/* <div className={styles.arrowBoxLeft}>
          <div className={styles.arrowBoxCenterLeft} />
        </div> */}
        {/* <div className={styles.navContent}>
          <div className={styles.centerNavContent}> */}
              {/* <div className={styles.registerContainer}> */}
                {/* {Boolean(admin) && <div className={styles.registrationForm}>
                  <div className={styles.titleContainer}><h1>Create Staff Member</h1></div>
                  <label for='firstName'>First Name:</label><input name='firstName' onChange={updateStaffField} id='firstName' />
                  <label for='lastName'>Last Name:</label><input name='lastName' onChange={updateStaffField} id='lastName' />
                  <label for='contactNo'>Contact No:</label><input name='contactNo' onChange={updateStaffField} id='contactNo' />
                  <label for='location'>Location:</label><input name='location' onChange={updateStaffField} id='location' />
                </div> */}
                {Boolean(admin) && <Slider>
                  {sliderArr}
                  </Slider>}
                {/* {Boolean(admin) &&
                <section className={styles.formContainer}>
                    <section className={styles.form}>
                      <h1>Patient Lat: {patientMarker.lat}</h1>
                      <h1>Patient Lng: {patientMarker.lng}</h1>
                      <div className={styles.registrationForm}>
                      <div className={styles.titleContainer}><h1>Create Staff Member</h1></div>
                      <label for='firstName'>First Name:</label><input name='firstName' onChange={updateStaffField} id='firstName' />
                      <label for='lastName'>Last Name:</label><input name='lastName' onChange={updateStaffField} id='lastName' />
                      <label for='contactNo'>Contact No:</label><input name='contactNo' onChange={updateStaffField} id='contactNo' />
                      <label for='location'>Location:</label><input name='location' onChange={updateStaffField} id='location' />
                    </div>
                    </section>
                  <section className={styles.mapContainer}>
                    <MapView onMarkerClick={(e) => console.log(e)} defaultZoom={10} renderPatientBoundaries={renderPatientBoundaries} patients={patients} renderMapMarkers={renderMapMarkers} staffList={staffList} updateLocation={updatePatientLocation}/>
                  </section>
                </section>
                } */}
              {/* </div> */}
          {/* </div>
        </div> */}
        {/* <div className={styles.arrowBoxRight}>
          <div className={styles.arrowBoxCenterRight} />
        </div> */}
      {/* </div> */}
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
