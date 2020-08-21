import React from "react"

import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"
import EditOrgModal from "../components/admin/edit-org-modal"
import NewOrgModal from "../components/admin/new-org-modal"
import OrgTable from "../components/orgs/org-table"

const AdminPage = () => {
  return (
    <AdminLayout>
      <OrgTable />
      <EditOrgModal />
      <NewOrgModal />
    </AdminLayout>
  )
}

export default AdminPage
