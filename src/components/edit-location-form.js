import React, { useState } from "react"
import firebaseDb, { firebaseDatabase } from "../utils/firebaseDb"

const EditLocationForm = ({
  locationToEdit,
  setLocation,
  location,
  noLocation,
}) => {
  function updateLocationData(event) {
    setLocation({
      ...location,
      name: event.target.value,
    })
  }

  const updateLocation = event => {
    event.preventDefault()
    firebaseDb
      .collection("locations")
      .doc(location.id)
      .set(location)
      .then(function (docRef) {
        setLocation(noLocation)
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
          id="new-location-form"
          name="new-location-form"
          onChange={updateLocationData}
          className="input"
          value={location.name}
        />
        <button className="button my-2 is-info" onClick={updateLocation}>
          Update Location
        </button>
      </form>
    </>
  )
}

export default EditLocationForm
