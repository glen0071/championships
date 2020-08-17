import React, { useState, useContext } from "react"
import firebaseDb from "../utils/firebaseDb"
import ServiceContext from "../contexts/service-context"
import LocationContext from "../contexts/location-context"

const ToggleButton = ({ name, updateCategory, selections, id }) => {
  const toggle = event => {
    event.preventDefault()
    updateCategory(event)
  }

  const setClasses = () => {
    if (selections.includes(name)) {
      return "button has-background-primary"
    } else {
      return "button"
    }
  }

  return (
    <button
      onClick={toggle}
      name={name}
      id={name + "_toggle"}
      key={id}
      className={setClasses(name)}
    >
      {name}
    </button>
  )
}

const OrgForm = ({ categoryList }) => {
  const formFields = ["name", "email", "phone", "address", "website"]
  const { serviceList } = useContext(ServiceContext)
  const { locationList } = useContext(LocationContext)

  const blankOrgForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    services: [],
    reportedServices: "",
    published: false,
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
    if (newOrgData.categories.includes(event.target.name)) {
      setNewOrgData({
        ...newOrgData,
        categories: newOrgData.categories.filter(
          service => service !== event.target.name
        ),
      })
    } else {
      setNewOrgData({
        ...newOrgData,
        categories: newOrgData.categories.concat(event.target.name),
      })
    }
  }

  const updateServices = event => {
    console.log(newOrgData.services)
    if (newOrgData.services.includes(event.target.name)) {
      setNewOrgData({
        ...newOrgData,
        services: newOrgData.services.filter(
          service => service !== event.target.name
        ),
      })
    } else {
      setNewOrgData({
        ...newOrgData,
        services: newOrgData.services.concat(event.target.name),
      })
    }
  }

  const updateLocation = event => {
    console.log(newOrgData.locations)
    if (newOrgData.locations.includes(event.target.name)) {
      setNewOrgData({
        ...newOrgData,
        locations: newOrgData.locations.filter(
          location => location !== event.target.name
        ),
      })
    } else {
      setNewOrgData({
        ...newOrgData,
        locations: newOrgData.locations.concat(event.target.name),
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
        setNewOrgData(blankOrgForm)
      })
      .catch(function (error) {
        console.error("Error updating document: ", error)
      })
  }

  return (
    <>
      <form>
        <h3 className="subtitle mt-4">Basic Info</h3>
        {inputs}
        <div className="field">
          <div className="control">
            <textarea
              onChange={updateOrgData}
              value={newOrgData.reportedServices}
              className="textarea"
              placeholder="reported services"
              id="services"
              name="reportedServices"
              wrap="hard"
            />
          </div>
        </div>
        <h3 className="subtitle mt-4">Published</h3>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="published"
              checked={newOrgData.published}
              onChange={updateOrgData}
              value={true}
            />
            True
          </label>
          <label className="radio">
            <input
              type="radio"
              name="published"
              checked={!newOrgData.published}
              onChange={updateOrgData}
              value={false}
            />
            False
          </label>
        </div>
        <h3 className="subtitle mt-4">Categories</h3>
        <div>
          {categoryList.map(cat => (
            <ToggleButton
              name={cat.name}
              updateCategory={updateCategory}
              id={cat.id}
              selections={newOrgData.categories}
            />
          ))}
        </div>
        <h3 className="subtitle mt-4">Locations</h3>
        {locationList.map(location => (
          <ToggleButton
            name={location.name}
            updateCategory={updateLocation}
            id={location.id}
            selections={newOrgData.locations}
            key={location.id}
          />
        ))}
        <h3 className="subtitle mt-4">Services</h3>
        {serviceList.map(service => (
          <ToggleButton
            name={service.name}
            updateCategory={updateServices}
            id={service.id}
            selections={newOrgData.services}
            key={service.id}
          />
        ))}
        <div>
          <button className="button" onClick={submitOrg}>
            Save Org
          </button>
        </div>
      </form>
    </>
  )
}

export default OrgForm
