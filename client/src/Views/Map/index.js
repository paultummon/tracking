import React, {Component, useEffect, useState} from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../../Actions/itemActions'
import { Marker, Circle } from 'react-google-maps'
import MapView from '../../components/MapView'
// import {addPatient, addStaffMember} from '../../Actions/addStaffActions'

const renderStaffMarkers = (staffList) => {
    return staffList.map((staff, index) => {
      const { lat, lng } = staff
      return (
        <Marker key={`map-marker-${index}`} position={{ lat: lat, lng: lng }} />
      )
    })
  }

const updatePatientLocation = e => {
  const { latLng } = e;
  const lat = latLng.lat();
  const lng = latLng.lng();
}

const Map = (props) => {
    const [geoLocation, setGeoLocation] = useState({ lat: '', lng: '' })
    const [loading, setLoading] = useState(true)
    const [renderPatientSearchDropDown, useRenderPatientSearchDropDown] = useState(false)

    const setLocation = (coordinates) => {
        const { latitude, longitude } = coordinates
        setGeoLocation({ lat: latitude, lng: longitude })
        setLoading(false)
    }

    const getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options)
        })
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { coords } = await getCurrentPosition()
            setLocation(coords)
          } catch (err) {
            console.error(err)
          }
        }
        fetchData()
        return () => {
        }
      }, [])

    return (
        <div>
            <MapView currentLocation={geoLocation} onMarkerClick={(e) => console.log(e)} defaultZoom={12} renderStaffMarkers={renderStaffMarkers} updateLocation={updatePatientLocation} />
            <h1>Functional Map View And this is Latitude: {geoLocation.lat}, And This is Longitude: {geoLocation.lng}</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem })(Map)