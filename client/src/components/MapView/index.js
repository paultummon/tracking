import React from 'react'
import { compose, withProps } from 'recompose'
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
  const { currentLocation: { lat, lng }, onMarkerClick, defaultZoom, patients, renderPatientBoundaries, renderMapMarkers, staffList, renderStaffMarkers } = props
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={{ lat: lat, lng: lng }}
    >
      {/* {renderStaffMarkers && renderStaffMarkers(staffList)} */}
      {renderMapMarkers && renderMapMarkers(patients)}
      {renderPatientBoundaries && renderPatientBoundaries(patients)}
      {<Marker position={{ lat: lat, lng: lng }} onClick={onMarkerClick} />}
    </GoogleMap>
  )
}
)

export default MapComponent
