import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { loadLoggedInUserDetails } from '../../actions/users'
import styles from './Admin.module.css'

const AdminView = (props) => {
  useEffect(() => {
    return () => {}
  }, [])

  const [panel, setPanel] = useState('')

  const [patientForm, setPatientFormState] = useState({ firstName: '', lastName: '', emergencyContact: '', emergencyContactNo: '', roamingRadius: '' })
  const [staffForm, setStaffFormState] = useState({ firstName: '', lastName: '', contactNo: '', location: '' })

  const updatePatientField = e => {
    setPatientFormState({
      ...patientForm,
      [e.target.name]: e.target.value
    })
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
      <div className={styles.adminNav}>
        <div className={styles.arrowBoxLeft}>
          <div className={styles.arrowBoxCenterLeft} />
        </div>
        <div className={styles.navContent}>
          <div className={styles.centerNavContent}>
            <div className={styles.registerContainer}>
              <div className={styles.registerContainer}>
                <h1> Hello {name} </h1>
                {!Boolean(admin) && <div className={styles.registrationForm}>
                  <div className={styles.titleContainer}><h1>Create Staff Member</h1></div>
                  <label for='firstName'>First Name:</label><input name='firstName' onChange={updateStaffField} id='firstName' />
                  <label for='lastName'>Last Name:</label><input name='lastName' onChange={updateStaffField} id='lastName' />
                  <label for='contactNo'>Contact No:</label><input name='contactNo' onChange={updateStaffField} id='contactNo' />
                  <label for='location'>Location:</label><input name='location' onChange={updateStaffField} id='location' />
                </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.arrowBoxRight}>
          <div className={styles.arrowBoxCenterRight} />
        </div>
      </div>
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
