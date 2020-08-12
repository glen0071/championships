import React from "react"

import CategoryButtons from "./category-buttons"

const Sidebar = ({ categoryList }) => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">Resources</p>
      <ul className="menu-list">
        <CategoryButtons categoryList={categoryList} />
      </ul>
    </aside>
  )
}

export default Sidebar
