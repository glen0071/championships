import React, { useState } from "react"

import EditLocationForm from "../locations/edit-location-form"
import NewLocationForm from "../locations/new-location-form"
import LocationList from "../locations/location-list"

const EditLocationsPage = () => {
  const noLocation = {
    name: "",
  }
  const [location, setLocation] = useState(noLocation)

  return (
    <div className="columns">
      <div className="column is-4">
        <div>New Location</div>
        <NewLocationForm />
      </div>
      <div className="column is-4">
        <LocationList />
      </div>
      <div className="column is-4">
        <EditLocationForm
          location={location}
          setLocation={setLocation}
          noLocation={noLocation}
        />
      </div>
    </div>
  )
}

export default EditLocationsPage
