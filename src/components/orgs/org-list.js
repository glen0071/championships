import React, { useContext } from "react"
import styled from "styled-components"

import CategoriesContext from "../../contexts/categories-context"
import OrgsContext from "../../contexts/orgs-context"

import Org from "./org"

const Columns = styled.div`
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap;
  @media only screen and (max-width: 760px) {
    padding: 0 !important;
  }
`

const OrgList = () => {
  const { displayedOrgList } = useContext(OrgsContext)
  const { selectedCategory } = useContext(CategoriesContext)

  const orgs = displayedOrgList.map(org => <Org org={org} key={org.id} />)

  return (
    <>
      <h1 className="title is-3">{selectedCategory}</h1>
      <h1 className="subtitle">We hope you find these resources helpful</h1>
      <Columns>{orgs ? orgs : "Coming soon..."}</Columns>
    </>
  )
}

export default OrgList
