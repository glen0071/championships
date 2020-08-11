import React, { useState } from "react"
import firebaseDb from "../utils/firebaseDb"

const ServiceForm = () => {
  const [newServiceName, setNewServiceName] = useState("")

  function updateServiceData(event) {
    event.preventDefault()
    setNewServiceName(event.target.value)
  }

  const submitService = event => {
    event.preventDefault()
    firebaseDb
      .collection("services")
      .add({ name: newServiceName })
      .then(function (docRef) {
        setNewServiceName("")
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
          id="service-form"
          name="service-form"
          onChange={updateServiceData}
          className="input"
        />
        <button className="button" onClick={submitService}>
          Save Service
        </button>
      </form>
    </>
  )
}

export default ServiceForm
