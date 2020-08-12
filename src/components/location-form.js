import React, { useState } from "react"
import firebaseDb from "../utils/firebaseDb"

const LocationForm = () => {
  const [newLocationName, setNewLocationName] = useState("")

  function updateLocationData(event) {
    event.preventDefault()
    setNewLocationName(event.target.value)
  }

  const submitLocation = event => {
    event.preventDefault()
    firebaseDb
      .collection("locations")
      .add({ name: newLocationName })
      .then(function (docRef) {
        setNewLocationName("")
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <form>
        <input
          id="location-form"
          name="location-form"
          onChange={updateLocationData}
          className="input"
        />
        <button className="button" onClick={submitLocation}>
          Save Location
        </button>
      </form>
    </>
  )
}

export default LocationForm
