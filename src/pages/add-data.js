import React from "react"
import { Link } from "gatsby"

import "./styles.scss"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import OrgForm from "../components/org-form"
import CategoryForm from "../components/category-form"
import ServiceForm from "../components/service-form"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="columns">
      <div className="column is-3">
        <Sidebar />
      </div>
      <div className="column is-9">
        <div className="my-4 has-background-light">
          <div className="px-4 py-1 has-text-centered ">
            <h3 className="subtitle mt-6">Add Organization</h3>
            <OrgForm />
          </div>
        </div>
        <div className="my-4 has-background-light">
          <div className="px-4 has-text-centered ">
            <h3 className="subtitle mt-6">Add Category</h3>
            <CategoryForm />
          </div>
        </div>
        <div className="my-4 has-background-light">
          <div className="px-4 has-text-centered ">
            <h3 className="subtitle mt-6">Add Service</h3>
            <ServiceForm />
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
