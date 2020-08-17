import React, { useState } from "react"
import firebaseDb from "../utils/firebaseDb"

const NewServiceForm = () => {
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
          id="new-service-form-name"
          name="name"
          onChange={updateServiceData}
          className="input"
          placeholder="name"
        />
        <button className="button is-info my-2" onClick={submitService}>
          Save Service
        </button>
      </form>
    </>
  )
}

export default NewServiceForm
