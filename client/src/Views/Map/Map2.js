import React, { useState, useEffect, useRef } from 'react'
import { mapContainer, sidenav, arrowBox, window, chatWindow, textRight, textLeft, textMessages, dropDownContainer, patientSearchContainer, searchInput, searchDropdownContainer, dropDownContent, displayBlock, displayNone, windowContainer, patientSearchInput, mapViewContainer } from './Map.module.css'
import classnames from 'classnames'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { loadLoggedInUserDetails } from '../../actions/users'
import { Marker, Circle } from 'react-google-maps'
import Dropdown from '../../components/DropDown'
import Loader from '../../components/Loader'
import Marquee from '../../components/Marquee'
import MapView from '../../components/MapView'
import ClickAway from '../../components/ClickAway'

const patients = [{ id: 2332, currentPerimeterLocation: { lat: 54.841810, lng: -7.263500, radius: 300 }, baseLocation: { lat: 54.841810, lng: -7.263500 } }, { id: 2332, currentPerimeterLocation: { lat: 54.855466, lng: -7.226855, radius: 300 }, baseLocation: { lat: 54.855466, lng: -7.226855 } }, { id: 2332, currentPerimeterLocation: { lat: 54.862185, lng: -7.281480, radius: 300 }, baseLocation: { lat: 54.862185, lng: -7.281480 } }]
const staffList = [{ id: 3434, name: 'Lucille Ball', lat: 54.859023, lng: -7.276382 }, { id: 2344, name: 'Carlos Engreva', lat: 54.845188, lng: -7.239647 }]

const updatePatientLocation = e => {
  const { latLng } = e;
  const lat = latLng.lat();
  const lng = latLng.lng();
}

const renderStaffMarkers = (staffList) => {
  return staffList.map((staff, index) => {
    const { lat, lng } = staff
    return (
      <Marker key={`map-marker-${index}`} position={{ lat: lat, lng: lng }} />
    )
  })
}

const renderPatientBoundaries = (patients) => {
  return patients.map((patient, index) => {
    const { currentPerimeterLocation: { lat, lng, radius } } = patient
    return (
      <Circle
        key={`patient-perimeter-${index}`}
        defaultCenter={{ lat, lng }}
        radius={radius}
        options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        }}
      />
    )
  })
}

const SelectPatient = (id, patientSearchRef, useRenderPatientSearchDropDown) => {
  patientSearchRef.current = id
  useRenderPatientSearchDropDown(false)
}

const renderPatientSearchList = (patientList, renderPatientSearchDropDown, patientSearchRef, useRenderPatientSearchDropDown) => {
  return (
    <ul className={classnames(dropDownContent, renderPatientSearchDropDown ? displayBlock : displayNone)}>
      {patientList.map((patient, index) => {
        const { name, id } = patient
        return <li onClick={() => SelectPatient(id, patientSearchRef, useRenderPatientSearchDropDown)} key={`patient-list-item-${index}`}>{id}</li>
      })}
    </ul>
  )
}

const renderMapMarkers = (markerLocations) => {
  return markerLocations.map((location, index) => {
    const { baseLocation: { lat, lng } } = location
    return <Marker key={`map-marker-${index}`} position={{ lat: lat, lng: lng }} />
  })
}

const toggleStaffMemberMapView = (e) => {
  e.preventDefault()
}

const togglePatientMapView = (e) => {
  e.preventDefault()
}

const filterPatients = (inputValue, patients, updatePatientList) => {
  updatePatientList((prevState) => {
    return prevState
  })
}

const MapViewComponent = (props) => {

  const patientSearchRef = useRef(null)
  const [patientList, usePatientList] = useState(patients)
  const listItemArray = [{ id: 2344, name: 'Abigail Abbot' }, { id: 2433, name: 'Jerry Jeckles' }, { id: 5453, name: 'Carsar Cali' }, { id: 5332, name: 'Wally Waze' }, { id: 6342, name: 'Sid Sidcup' }, { id: 7343, name: 'Violet Viera' }, { id: 7843, name: 'Giles Gilbert' }]
  const bannerContent = ['Patient 2344 Escaped', 'Patient 2344 Escaped', 'Patient 2344 Escaped', 'Patient 2344 Escaped', 'Patient 2344 Escaped', 'Patient 2344 Escaped']
  const filterList = (value, list, updateList) => {
    updateList(list.filter(item => item.id.toString().includes(value) || item.name.toLowerCase.includes(value.toLowerCase())))
  }

  const renderListItems = (listItems) => {
    return listItems.map((item, index) => {
      const { name, id } = item
      return <a key={`listItem-${id}`} href={`#${name.toLowerCase()}`}>{name}</a>
    })
  }

  const [renderPatientSearchDropDown, useRenderPatientSearchDropDown] = useState(false)
  return (
      <div>
      <Marquee bannerContent={bannerContent} />
        <div>
          <div className={sidenav}>
            <div className={arrowBox} />
            <a href='#' onClick={toggleStaffMemberMapView}>Staff</a>
            <a href='#' onClick={togglePatientMapView}>Patients</a>
            <div className={dropDownContainer}>
              <Dropdown renderListItems={renderListItems} filter={filterList} listItems={listItemArray} />
            </div>
            <div className={windowContainer}>
              <div className={chatWindow}>
                <div className={window}>
                  <div className={textMessages}>
                    <h1 className={textRight}>{}</h1>
                    <h1 className={textLeft}>{}</h1>
                  </div>
                </div>
                <input className={patientSearchInput} type='text' />
              </div>
            </div>
          </div>

          <div className={patientSearchContainer}>
            <MapView onMarkerClick={(e) => console.log(e)} defaultZoom={12} renderStaffMarkers={renderStaffMarkers}  />
            <div className={searchInput}>
              <ClickAway handleComponentFocus={useRenderPatientSearchDropDown}>
                <div className={searchDropdownContainer}>
                  <input onChange={(e) => filterPatients(e.target.value, patientList, usePatientList)} ref={patientSearchRef} type='text' />
                  {renderPatientSearchList(patients, renderPatientSearchDropDown, patientSearchRef, useRenderPatientSearchDropDown)}
                </div>
              </ClickAway>
              <button>Locate Patient</button>
            </div>
          </div>
          <div className={mapContainer}>
            <MapView onMarkerClick={(e) => console.log(e)} defaultZoom={10} renderPatientBoundaries={renderPatientBoundaries} patients={patients} renderMapMarkers={renderMapMarkers} staffList={staffList} updateLocation={updatePatientLocation}/>
          </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({ loadLoggedInUserDetails: loadLoggedInUserDetails }, dispatch)
// }

// export default connect(mapStateToProps, matchDispatchToProps)(MapViewComponent)


export default connect(mapStateToProps, null)(MapViewComponent)