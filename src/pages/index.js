import React, { useContext } from "react"

import "./styles.scss"

import Layout from "../components/layouts/layout"
import SEO from "../components/layouts/seo"
import OrgList from "../components/orgs/org-list"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <OrgList />
    </Layout>
  )
}

export default IndexPage
