import React, { useState, useContext } from "react"
import firebaseDb from "../../utils/firebaseDb"
import CategoriesContext from "../../contexts/categories-context"
import OrgsContext from "../../contexts/orgs-context"

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

const OrgForm = () => {
  const formFields = ["name", "email", "phone", "address", "website"]
  const { categoryList } = useContext(CategoriesContext)
  const {
    displayedOrgList,
    setDisplayedOrgList,
    setShowNewOrgModal,
  } = useContext(OrgsContext)

  const blankOrgForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    services: [{ name: "" }],
    published: false,
    categories: [],
    locations: [{ name: "" }],
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
          category => category !== event.target.name
        ),
      })
    } else {
      setNewOrgData({
        ...newOrgData,
        categories: newOrgData.categories.concat(event.target.name),
      })
    }
  }

  const submitOrg = event => {
    event.preventDefault()

    firebaseDb
      .collection("organizations")
      .add(newOrgData)
      .then(function (docRef) {
        setNewOrgData({
          ...newOrgData,
          id: docRef.id,
        })
        setDisplayedOrgList(displayedOrgList.concat(newOrgData))
        setShowNewOrgModal(false)
      })
      .catch(function (error) {
        console.error("Error updating document: ", error)
      })
  }

  const addService = event => {
    event.preventDefault()
    setNewOrgData({
      ...newOrgData,
      services: newOrgData.services.concat({ name: "" }),
    })
  }

  const updateService = event => {
    setNewOrgData({
      ...newOrgData,
      services: newOrgData.services.map((service, serviceIndex) => {
        if (parseInt(event.target.dataset.index) !== serviceIndex) {
          return service
        } else {
          return {
            ...service,
            name: event.target.value,
          }
        }
      }),
    })
  }

  const addLocation = event => {
    event.preventDefault()
    setNewOrgData({
      ...newOrgData,
      locations: newOrgData.locations.concat({ name: "" }),
    })
  }

  const updateLocation = event => {
    setNewOrgData({
      ...newOrgData,
      locations: newOrgData.locations.map((location, locationIndex) => {
        if (parseInt(event.target.dataset.index) !== locationIndex) {
          return location
        } else {
          return {
            ...location,
            name: event.target.value,
          }
        }
      }),
    })
  }

  return (
    <>
      <form>
        <h3 className="subtitle mt-4">Basic Info</h3>
        {inputs}
        <h3 className="subtitle mt-4">Services</h3>
        {newOrgData.services.map((service, index) => (
          <input
            type="text"
            placeholder="summarize service provided"
            key={service + "_" + index}
            value={service.name}
            className="input"
            data-index={index}
            onChange={event => {
              updateService(event)
            }}
          />
        ))}
        <button onClick={addService}>Add Another</button>
        <h3 className="subtitle mt-4">Published</h3>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="published"
              checked={newOrgData.published}
              onChange={event =>
                setNewOrgData({ ...newOrgData, published: true })
              }
            />
            True
          </label>
          <label className="radio">
            <input
              type="radio"
              name="published"
              checked={!newOrgData.published}
              onChange={event =>
                setNewOrgData({ ...newOrgData, published: false })
              }
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
              key={cat.id}
            />
          ))}
        </div>
        <h3 className="subtitle mt-4">Locations</h3>
        {newOrgData.locations.map((location, index) => (
          <input
            type="text"
            placeholder="City, State"
            key={location + "_" + index}
            value={location.name}
            className="input"
            data-index={index}
            onChange={event => {
              updateLocation(event)
            }}
          />
        ))}
        <button onClick={addLocation}>Add Another</button>
        <div className="buttons is-centered my-2">
          <button className="button is-info" onClick={submitOrg}>
            Save Org
          </button>
          <button
            className="button is-info"
            onClick={event => {
              event.preventDefault()
              setShowNewOrgModal(false)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default OrgForm
