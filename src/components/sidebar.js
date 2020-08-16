import React from "react"

import CategoryButtons from "./category-buttons"

const Sidebar = () => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label ml-2">Resources</p>
      <ul className="menu-list">
        <CategoryButtons />
      </ul>
    </aside>
  )
}

export default Sidebar
