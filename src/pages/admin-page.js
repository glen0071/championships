import React from "react"

import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"
import EditLocationsTab from "../components/admin/edit-locations-tab"
import EditOrganizationsTab from "../components/admin/edit-organizations-tab"
import EditServicesTab from "../components/admin/edit-services-tab"
import SEO from "../components/layouts/seo"

const AdminPage = () => {
  return (
    <AdminLayout>
      <SEO title="Home" />
      <EditOrganizationsTab />
      <EditLocationsTab />
      <EditServicesTab />
    </AdminLayout>
  )
}

export default AdminPage
