import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import App from "./app"
import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"
import HamburgerNav from "./hamburger-nav"

const Layout = ({ children, aboutPage }) => {
  return (
    <App>
      <HamburgerNav aboutPage={aboutPage} />
      <Header />
      <div className="columns" style={{ margin: "0" }}>
        <div className="column is-3">
          <Sidebar />
        </div>
        <div className="column is-9">{children}</div>
      </div>
      <Footer />
    </App>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
