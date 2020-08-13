import React, { useEffect } from "react"

import CategoryButtons from "./category-buttons"

const Sidebar = ({ categoryList, selectCategory, selectedCategory }) => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">Resources</p>
      <ul className="menu-list">
        <CategoryButtons
          categoryList={categoryList}
          selectCategory={selectCategory}
          selectedCategory={selectedCategory}
        />
      </ul>
    </aside>
  )
}

export default Sidebar
