import React, { useState } from "react"
import { Link } from "gatsby"

import CategoryButtons from "../categories/category-buttons"

const HamburgerNav = () => {
  const [isActive, setIsActive] = useState(false)

  const isActiveClass = () => {
    return isActive ? "is-active" : ""
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Reentry MN
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
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable is-hidden-desktop">
            <a className="navbar-link">Resources</a>
            <div className="navbar-dropdown ">
              <CategoryButtons />
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Link className="navbar-item is-pulled-right" to="/about">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HamburgerNav
