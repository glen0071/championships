import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import Layout from "../components/layout"
import EditLocationForm from "../components/edit-location-form"
import LocationList from "../components/location-list"

const EditLocationsPage = () => {
  const noLocation = {
    name: "",
    id: "",
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
    <Layout>
      <div className="columns">
        <div className="column is-9">
          <div className="my-4 has-background-grey-lighter">
            <div className="px-4 has-text-centered ">
              <h3 className="subtitle mt-6">Edit Location</h3>
              <EditLocationForm location={location} setLocation={setLocation} />
            </div>
          </div>
        </div>
        <div className="i2-3">
          <h3 className="subtitle mt-4">Locations</h3>
          <LocationList locationData={locationData} setLocation={setLocation} />
        </div>
      </div>
    </Layout>
  )
}

export default EditLocationsPage
