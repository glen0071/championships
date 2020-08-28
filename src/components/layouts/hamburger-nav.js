import React, { useState, useContext } from "react"
import styled from "styled-components"

import CategoriesContext from "../../contexts/categories-context"
import AboutContext from "../../contexts/about-context"

import CategoryButtons from "../categories/category-buttons"

const HoverLink = styled.div`
  :hover {
    cursor: pointer;
  }
`

const HamburgerNav = () => {
  const { setShowAbout } = useContext(AboutContext)
  const [isActive, setIsActive] = useState(false)
  const { selectCategory, defaultCategory } = useContext(CategoriesContext)

  const isActiveClass = () => {
    return isActive ? "is-active" : ""
  }

  const goHome = () => {
    setShowAbout(false)
    selectCategory(defaultCategory)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <HoverLink className="navbar-item" onClick={goHome}>
          Reentry MN
        </HoverLink>

        <a
          role="button"
          className={`navbar-burger burger ${isActiveClass()}`}
          aria-label="menu"
          aria-expanded="fa"
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

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <HoverLink
                className="navbar-item is-pulled-right"
                onClick={() => setShowAbout(true)}
              >
                About
              </HoverLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HamburgerNav
