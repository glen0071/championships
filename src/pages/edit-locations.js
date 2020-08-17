import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"

import EditLocationForm from "../components/edit-location-form"
import NewLocationForm from "../components/new-location-form"
import LocationList from "../components/location-list"

const EditLocationsPage = () => {
  const noLocation = {
    name: "",
  }
  const [location, setLocation] = useState(noLocation)
  const [locationData, setLocationData] = useState([])

  const loadLocations = () => {
    return firebaseDb
      .collection("locations")
      .get()
      .then(function (querySnapshot) {
        let locationsArray = []
        querySnapshot.forEach(function (doc) {
          locationsArray.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setLocationData(locationsArray)
      })
  }

  useEffect(() => {
    loadLocations()
  }, [])

  return (
    <AdminLayout>
      <div className="columns">
        <div className="column is-9">
          <div className="my-4">
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Add Location</h3>
              <NewLocationForm />
            </div>
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Edit Location</h3>
              <EditLocationForm
                location={location}
                setLocation={setLocation}
                noLocation={noLocation}
              />
            </div>
          </div>
        </div>
        <div className="i2-3">
          <h3 className="subtitle mt-4">Locations</h3>
          <LocationList locationData={locationData} setLocation={setLocation} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default EditLocationsPage
