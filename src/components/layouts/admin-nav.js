import React, { useState } from "react"
import { Link } from "gatsby"

const HamburgerNav = () => {
  const [isActive, setIsActive] = useState(false)

  const isActiveClass = () => {
    return isActive ? "is-active" : ""
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Reentry MN Admin
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${isActiveClass()}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isActiveClass()}`}>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown">
            <Link className="navbar-item" to="/edit-organizations">
              Edit Organizations
            </Link>
            <Link className="navbar-item" to="/edit-categories">
              Edit Categories
            </Link>
            <Link className="navbar-item" to="/edit-locations">
              Edit Locations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HamburgerNav
