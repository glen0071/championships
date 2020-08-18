import React, { useContext } from "react"
import firebaseDb from "../../utils/firebaseDb"
import LocationContext from "../../contexts/location-context"

const EditLocationForm = () => {
  const { setLocationToEdit, noLocation, locationToEdit } = useContext(
    LocationContext
  )
  function updateLocationData(event) {
    setLocationToEdit({
      ...locationToEdit,
      name: event.target.value,
    })
  }

  const updateLocation = event => {
    event.preventDefault()
    firebaseDb
      .collection("locations")
      .doc(locationToEdit.id)
      .set(locationToEdit)
      .then(function (docRef) {
        setLocationToEdit(noLocation)
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
          id="new-location-form"
          name="new-location-form"
          onChange={updateLocationData}
          className="input"
          value={locationToEdit.name}
        />
        <button className="button my-2 is-info" onClick={updateLocation}>
          Update Location
        </button>
      </form>
    </>
  )
}

export default EditLocationForm
