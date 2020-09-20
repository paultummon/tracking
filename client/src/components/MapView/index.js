import React, { useEffect, useState } from 'react'
import { compose, withProps } from 'recompose'
import Loader from '../../components/Loader'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBdmfCMRZxZ5DbBT8s4XcY384QMnH47pGE',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [loading, setLoading] = useState(true)
  const [geoLocation, setGeoLocation] = useState({ lat: '', lng: '' })

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
 
  const {lat, lng } = geoLocation
  const { onMarkerClick, defaultZoom, patients, renderPatientBoundaries, renderMapMarkers, staffList, renderStaffMarkers, updateLocation } = props
  return (
    <Loader loading={loading}>
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={{ lat: lat, lng: lng }}
      onClick={updateLocation}
    >
      {/* {renderStaffMarkers && renderStaffMarkers(staffList)} */}
      {renderMapMarkers && renderMapMarkers(patients)}
      {renderPatientBoundaries && renderPatientBoundaries(patients)}
      {<Marker position={{ lat: lat, lng: lng }} onClick={onMarkerClick} />}
    </GoogleMap>
    </Loader>
  )
}
)

export default MapComponent
