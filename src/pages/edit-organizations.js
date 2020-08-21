import React from "react"
import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"
import OrgForm from "../components/orgs/new-org-form"

const AddDataPage = () => {
  return (
    <AdminLayout>
      <div className="columns">
        <div className="my-4 has-background-grey-lighter column is-9">
          <div className="px-4 py-1">
            <h3 className="subtitle mt-6">Add Organization</h3>
            <OrgForm />
          </div>
        </div>
        <div className="column is-3"></div>
      </div>
    </AdminLayout>
  )
}

export default AddDataPage
