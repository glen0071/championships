import React from "react"
import styled from "styled-components"

const Column = styled.div`
  border: solid 1px #085064;
  width: 49%;
  @media only screen and (max-width: 770px) {
    width: 100%;
    margin-left: 0 !important;
  }
`

const Org = ({ org }) => {
  const displayLocations = locations => {
    return locations.map(location => {
      return location.name
    })
  }

  return (
    <Column className="my-2 ml-1 px-4 has-text-centered">
      {org.website === undefined || org.website === "" ? (
        <h3 className="is-size-4 has-text-weight-bold">{org.name}</h3>
      ) : (
        <a href={org.website} target="_blank" rel="noreferrer">
          <h3 className="is-size-4 has-text-weight-bold color-black">
            {org.name}
          </h3>
        </a>
      )}
      <div>{displayLocations(org.locations).join(" • ")}</div>
      <div>{org.phone}</div>
    </Column>
  )
}

export default Org
