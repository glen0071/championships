import React from "react"

import "./styles.scss"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import OrgList from "../components/org-list"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="columns">
      <div className="column is-3 is-hidden-mobile">
        <Sidebar />
      </div>
      <div className="column is-9">
        <h1 className="title is-3">Category Name</h1>
        <h1 className="subtitle">Category Subtitle</h1>
        <OrgList />
        <div className="content"></div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
