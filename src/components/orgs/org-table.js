import React, { useContext } from "react"

import OrgsContext from "../../contexts/orgs-context"

const Row = ({ org }) => {
  const { setShowEditOrgModal, setOrgToEdit } = useContext(OrgsContext)

  const selectOrgToEdit = () => {
    setShowEditOrgModal(true)
    setOrgToEdit(org)
  }

  const listServices = services => {
    if (services === undefined) {
      return ""
    } else {
      return services
        .map(service => {
          return service.name
        })
        .join(" * ")
    }
  }

  const listLocations = locations => {
    if (locations === undefined) {
      return ""
    } else {
      return locations
        .map(location => {
          return location.name
        })
        .join(" * ")
    }
  }

  return (
    <tr onClick={selectOrgToEdit}>
      <th>{org.name}</th>
      <th>{org.categories.join(", ")}</th>
      <th>{org.website}</th>
      <th>{listLocations(org.locations)}</th>
      <th>{listServices(org.services)}</th>
      <th>{org.published ? "Yes" : "No"}</th>
    </tr>
  )
}

const OrgTable = () => {
  const { displayedOrgList, setShowNewOrgModal } = useContext(OrgsContext)
  return (
    <>
      <h1 className="title is-3">Organizations</h1>
      <button
        onClick={event => {
          event.preventDefault()
          setShowNewOrgModal(true)
        }}
        className="button"
      >
        Add New Organization
      </button>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <td> Name</td>
              <td>Categories</td>
              <td>Website</td>
              <td>Locations</td>
              <td>Services</td>
              <td>Published</td>
            </tr>
          </thead>
          <tbody>
            {displayedOrgList.map(org => (
              <Row key={org.id} org={org} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrgTable
