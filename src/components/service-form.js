import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

const ServiceForm = () => {
  const blankServiceForm = { name: "" }
  const [ServiceData, setServiceData] = useState(blankServiceForm)

  const loadServices = () => {
    firebaseDb
      .collection("services")
      .get()
      .then(function (querySnapshot) {
        let servicesArray = []
        querySnapshot.forEach(function (doc) {
          servicesArray.push(doc.data().name)
        })
        setServiceData(servicesArray)
      })
  }

  const updateServiceData = event => {
    setServiceData({ name: event.target.value })
  }

  const submitService = event => {
    event.preventDefault()
    firebaseDb
      .collection("servicess")
      .add(ServiceData)
      .then(function (docRef) {
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <>
      <form>
        <input
          id="service"
          name="service"
          onChange={updateServiceData}
          className="input"
          value={ServiceData.name}
        />
        <button className="button" onClick={submitService}>
          Save Service
        </button>
      </form>
    </>
  )
}

export default ServiceForm
