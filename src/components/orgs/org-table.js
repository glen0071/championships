import React, { useContext } from "react"
import styled from "styled-components"

import OrgsContext from "../../contexts/orgs-context"

const HoverRow = styled.tr`
  :hover {
    cursor: pointer;
  }
`

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
    <HoverRow onClick={selectOrgToEdit} key={org.id}>
      <th>{org.name}</th>
      <th>{org.categories.join(", ")}</th>
      <th>{org.website}</th>
      <th>{listLocations(org.locations)}</th>
      <th>{listServices(org.services)}</th>
      <th>{org.published ? "Yes" : "No"}</th>
    </HoverRow>
  )
}

const OrgTable = () => {
  const {
    displayedOrgList,
    orgList,
    setDisplayedOrgList,
    setShowNewOrgModal,
  } = useContext(OrgsContext)

  const filterOrgs = event => {
    let filterString = event.target.value
    if (filterString === undefined || filterString === "") {
      setDisplayedOrgList(orgList)
    } else {
      setDisplayedOrgList(
        orgList.filter(org => {
          return org.name.toLowerCase().includes(filterString.toLowerCase())
        })
      )
    }
  }

  return (
    <>
      <h1 className="title is-3">Resources</h1>
      <div className="columns">
        <button
          onClick={event => {
            event.preventDefault()
            setShowNewOrgModal(true)
          }}
          className="button column is-one-third"
        >
          Add New Resource
        </button>
        <input
          className="input is-pulled-right column is-one-third is-offset-one-third"
          type="text"
          name="filter"
          placeholder="Filter by Name"
          onChange={event => filterOrgs(event)}
        />
      </div>
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
              <Row org={org} key={org.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrgTable
