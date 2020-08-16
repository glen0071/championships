import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import firebaseDb from "../utils/firebaseDb"

import App from "./app"
import AdminApp from "./admin-app"
import Header from "./header"
import HamburgerNav from "./hamburger-nav"

const Layout = ({ children }) => {
  return (
    <App>
      <AdminApp>
        <Header />
        <div className="columns" style={{ margin: "0" }}>
          <div className="column is-8">{children}</div>
        </div>
      </AdminApp>
    </App>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
