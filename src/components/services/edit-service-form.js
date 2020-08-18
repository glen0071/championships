import React, { useState } from "react"
import firebaseDb, { firebaseDatabase } from "../../utils/firebaseDb"

const EditServiceForm = ({ serviceToEdit, setService, service, noService }) => {
  function updateServiceData(event) {
    setService({
      ...service,
      name: event.target.value,
    })
  }

  const updateService = event => {
    event.preventDefault()
    firebaseDb
      .collection("services")
      .doc(service.id)
      .set(service)
      .then(function (docRef) {
        setService(noService)
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <form>
        <p>{serviceToEdit}</p>
        <input
          id="new-service-form"
          name="new-service-form"
          onChange={updateServiceData}
          className="input"
          value={service.name}
        />
        <button className="button is-info my-2" onClick={updateService}>
          Update Service
        </button>
      </form>
    </>
  )
}

export default EditServiceForm
