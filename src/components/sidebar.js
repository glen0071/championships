import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">Resources</p>
      <ul className="menu-list">
        <li>
          <a>Jobs</a>
        </li>
        <li>
          <a>Homes</a>
        </li>
      </ul>
    </aside>
  )
}

export default Header
