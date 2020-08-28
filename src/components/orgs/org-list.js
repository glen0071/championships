import React, { useContext } from "react"
import styled from "styled-components"
import { css } from "@emotion/core"
import PuffLoader from "react-spinners/PuffLoader"

import CategoriesContext from "../../contexts/categories-context"
import OrgsContext from "../../contexts/orgs-context"
import AboutContext from "../../contexts/about-context"

import IntroInfo from "../layouts/intro-info"
import About from "../layouts/about"
import Org from "./org"

const override = css`
  display: block;
  margin: 5em auto;
`

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
  const { showAbout } = useContext(AboutContext)

  const orgs = displayedOrgList.map(org => <Org org={org} key={org.id} />)
  const emptyArray = []
  return (
    <>
      {showAbout ? (
        <About />
      ) : (
        <>
          <h1 className="title is-3">{selectedCategory.name}</h1>
          <h1 className="subtitle">We hope you find these resources helpful</h1>
          {displayedOrgList.length > 0 ? (
            <>
              <IntroInfo />
              <Columns>{orgs ? orgs : "Coming soon..."}</Columns>
            </>
          ) : (
            <>
              <PuffLoader
                css={override}
                size={150}
                StyledPuffLoader
                color={"#085064"}
              />
            </>
          )}
        </>
      )}
    </>
  )
}

export default OrgList
