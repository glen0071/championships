import React, { useState } from "react"
import firebaseDb from "../utils/firebaseDb"

const EditLocationForm = ({ locationToEdit, setLocation, location }) => {
  function updateLocationData(event) {
    setLocation({
      ...location,
      name: event.target.value,
    })
    console.log(location)
  }

  const updateLocation = event => {
    event.preventDefault()
    firebaseDb
      .collection("locations")
      .add({ name: location })
      .then(function (docRef) {
        setLocation("")
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <form>
        <p>{locationToEdit}</p>
        <input
          id="location-form"
          name="location-form"
          onChange={updateLocationData}
          className="input"
          value={location.name}
        />
        <button className="button" onClick={updateLocation}>
          Update Location
        </button>
      </form>
    </>
  )
}

export default EditLocationForm
