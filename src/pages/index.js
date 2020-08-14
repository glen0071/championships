import React from "react"

import "./styles.scss"

import Layout from "../components/layout"
import OrgList from "../components/org-list"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <OrgList />
    </Layout>
  )
}

export default IndexPage
