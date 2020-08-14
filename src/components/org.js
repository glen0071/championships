import React from "react"
import styled from "styled-components"

const Column = styled.div`
  border: solid 1px #085064;
  @media only screen and (max-width: 760px) {
    margin-left: 0 !important;
  }
`

const Org = ({ org }) => {
  return (
    <Column className="my-2 ml-2 px-4 column is-half has-text-centered">
      <h3 className="is-size-4 has-text-weight-bold">{org.name}</h3>
      <div>{org.locations.join(" • ")}</div>
      <div>{org.phone}</div>

      <ul>
        <span className="has-text-weight-bold">Services:</span>
        {org.services.map(service => (
          <div>{service}</div>
        ))}
      </ul>
    </Column>
  )
}

export default Org
