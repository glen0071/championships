import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import AdminApp from "./admin-app"
import Header from "./header"
import AdminNav from "./admin-nav"

const Layout = ({ children }) => {
  return (
    <AdminApp>
      <AdminNav />
      <Header />
      <div className="columns" style={{ margin: "0" }}>
        <div className="column">{children}</div>
      </div>
    </AdminApp>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
