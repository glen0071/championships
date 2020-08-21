import React, { useContext } from "react"
import firebaseDb from "../../utils/firebaseDb"
import LocationContext from "../../contexts/location-context"
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
  const {
    displayedOrgList,
    setDisplayedOrgList,
    orgToEdit,
    setOrgToEdit,
    setShowEditOrgModal,
  } = useContext(OrgsContext)
  const { locationList } = useContext(LocationContext)
  const { categoryList } = useContext(CategoriesContext)

  const inputs = formFields.map(field => (
    <div className="field" key={field}>
      <div className="control">
        <input
          onChange={updateOrgData}
          value={orgToEdit[field]}
          className="input"
          placeholder={field}
          id={field}
          name={field}
        />
      </div>
    </div>
  ))

  function updateOrgData(event) {
    setOrgToEdit({
      ...orgToEdit,
      [event.target.name]: event.target.value,
    })
  }

  const updateCategory = event => {
    if (orgToEdit.categories.includes(event.target.name)) {
      setOrgToEdit({
        ...orgToEdit,
        categories: orgToEdit.categories.filter(
          category => category !== event.target.name
        ),
      })
    } else {
      setOrgToEdit({
        ...orgToEdit,
        categories: orgToEdit.categories.concat(event.target.name),
      })
    }
  }

  const submitToFirebase = event => {
    event.preventDefault()
    firebaseDb
      .collection("organizations")
      .doc(orgToEdit.id)
      .set(orgToEdit)
      .then(function () {
        console.log("Document successfully updated!")
        setDisplayedOrgList(
          displayedOrgList.map(org => {
            if (org.id === orgToEdit.id) {
              return orgToEdit
            } else {
              return org
            }
          })
        )
        setShowEditOrgModal(false)
      })
      .catch(function (error) {
        console.error("Error updating document: ", error)
      })
  }

  const addService = event => {
    event.preventDefault()
    setOrgToEdit({
      ...orgToEdit,
      services: orgToEdit.services.concat({ name: "" }),
    })
  }

  const updateService = event => {
    setOrgToEdit({
      ...orgToEdit,
      services: orgToEdit.services.map((service, serviceIndex) => {
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
    setOrgToEdit({
      ...orgToEdit,
      locations: orgToEdit.locations.concat({ name: "" }),
    })
  }

  const updateLocation = event => {
    setOrgToEdit({
      ...orgToEdit,
      locations: orgToEdit.locations.map((location, locationIndex) => {
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
        {orgToEdit.services.map((service, index) => (
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
              checked={orgToEdit.published}
              onChange={event =>
                setOrgToEdit({ ...orgToEdit, published: true })
              }
            />
            True
          </label>
          <label className="radio">
            <input
              type="radio"
              name="published"
              checked={!orgToEdit.published}
              onChange={event =>
                setOrgToEdit({ ...orgToEdit, published: false })
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
              selections={orgToEdit.categories}
              key={cat.id}
            />
          ))}
        </div>
        <h3 className="subtitle mt-4">Locations</h3>
        {orgToEdit.locations.map((location, index) => (
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
          <button className="button is-info" onClick={submitToFirebase}>
            Save Org
          </button>
          <button
            className="button is-info"
            onClick={event => {
              event.preventDefault()
              setShowEditOrgModal(false)
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
