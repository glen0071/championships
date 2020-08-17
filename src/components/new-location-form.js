import React, { useState } from "react"
import firebaseDb from "../utils/firebaseDb"

const NewLocationForm = () => {
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
        setNewLocationName("")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <form>
        <input
          id="new-location-form-name"
          name="name"
          onChange={event => {
            setNewLocationName(event.target.value)
          }}
          className="input"
          placeholder="name"
          value={newLocationName}
        />
        <button className="button" onClick={submitLocation}>
          Save Location
        </button>
      </form>
    </>
  )
}

export default NewLocationForm
