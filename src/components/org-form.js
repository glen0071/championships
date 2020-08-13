import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

const Checkbox = ({ name, onChange }) => (
  <div id={name + "_id"}>
    <label htmlFor={name}>{name}</label>
    <input
      type="checkbox"
      name={name}
      onChange={onChange}
      id={name + "_checkbox"}
    />
  </div>
)

const OrgForm = ({ categoryList, locationList, serviceList }) => {
  const formFields = ["name", "email", "phone", "address"]

  const blankOrgForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    services: [],
    reportedServices: "",
    categories: [],
    locations: [],
  }

  const [newOrgData, setNewOrgData] = useState(blankOrgForm)

  const inputs = formFields.map(field => (
    <div className="field" key={field}>
      <div className="control">
        <input
          onChange={updateOrgData}
          value={newOrgData[field]}
          className="input"
          placeholder={field}
          id={field}
          name={field}
        />
      </div>
    </div>
  ))

  function updateOrgData(event) {
    setNewOrgData({
      ...newOrgData,
      [event.target.name]: event.target.value,
    })
  }

  const updateCategory = event => {
    if (event.target.checked === true) {
      setNewOrgData({
        ...newOrgData,
        categories: newOrgData.categories.concat(event.target.name),
      })
    } else {
      setNewOrgData({
        ...newOrgData,
        categories: newOrgData.categories.filter(
          service => service !== event.target.name
        ),
      })
    }
  }

  const updateServices = event => {
    if (event.target.checked === true) {
      setNewOrgData({
        ...newOrgData,
        services: newOrgData.services.concat(event.target.name),
      })
    } else {
      setNewOrgData({
        ...newOrgData,
        services: newOrgData.services.filter(
          service => service !== event.target.name
        ),
      })
    }
  }

  const updateLocation = event => {
    if (event.target.checked === true) {
      setNewOrgData({
        ...newOrgData,
        locations: newOrgData.locations.concat(event.target.name),
      })
    } else {
      setNewOrgData({
        ...newOrgData,
        locations: newOrgData.locations.filter(
          location => location !== event.target.name
        ),
      })
    }
  }

  const submitOrg = event => {
    event.preventDefault()

    firebaseDb
      .collection("organizations")
      .add(newOrgData)
      .then(function () {
        console.log("Document successfully updated!")
      })
      .catch(function (error) {
        console.error("Error updating document: ", error)
      })
  }

  const catOptions = categoryList.map(cat => (
    <Checkbox name={cat.name} onChange={updateCategory} key={cat.id} />
  ))

  const locationOptions = locationList.map(location => (
    <Checkbox name={location} onChange={updateLocation} key={location} />
  ))

  const serviceOptions = serviceList.map(service => (
    <div key={service} id={service + "_div"}>
      <label htmlFor={service}>{service}</label>
      <input
        type="checkbox"
        id={service + "_input"}
        name={service}
        value={service}
      />
    </div>
  ))

  return (
    <>
      <form>
        <h3 className="subtitle mt-4">Categories</h3>
        {catOptions}
        <h3 className="subtitle mt-4">Locations</h3>
        {locationOptions}
        {inputs}
        <div className="field">
          <div className="control">
            <input
              onChange={updateOrgData}
              value={newOrgData["reportedServices"]}
              className="textarea"
              placeholder="reported services"
              id="services"
              name="services"
            />
          </div>
        </div>
        <h3 className="subtitle mt-4">Services</h3>
        {serviceOptions}
        <div>
          <button
            className="button"
            onClick={submitOrg}
            onChange={updateServices}
          >
            Save Org
          </button>
        </div>
      </form>
    </>
  )
}

export default OrgForm
