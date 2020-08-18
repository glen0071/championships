import React from "react"

import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"
import EditLocationsTab from "../components/admin/edit-locations-tab"
import EditOrganizationsTab from "../components/admin/edit-organizations-tab"

const AdminPage = () => {
  return (
    <AdminLayout>
      <EditOrganizationsTab />
      <EditLocationsTab />
    </AdminLayout>
  )
}

export default AdminPage
