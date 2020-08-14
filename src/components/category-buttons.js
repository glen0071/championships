import React, { useContext } from "react"

import ResourcesContext from "../components/resource-context"

const CategoryButton = ({ category, selectCategory, classes }) => {
  const clickedCategory = category => {
    selectCategory(category)
  }

  return (
    <div
      onClick={() => {
        clickedCategory(category)
      }}
      className={classes}
    >
      {category.name}
    </div>
  )
}

const CategoryButtons = ({ selectCategory, selectedCategory }) => {
  const categoryList = useContext(ResourcesContext)

  const categories = categoryList ? categoryList : []
  const setClasses = category => {
    return category.name === selectedCategory
      ? "button column is-full is-active"
      : "button column is-full"
  }

  const categoriesDisplayed = categories
    .sort((a, b) => {
      console.log(a, b)
      if (a.rank > b.rank) return 1
      if (a.rank < b.rank) return -1
      return 0
    })
    .map(category => (
      <CategoryButton
        key={category.id}
        category={category}
        selectCategory={selectCategory}
        selectedCategory={selectedCategory}
        classes={setClasses(category)}
      />
    ))

  return <div className="buttons columns">{categoriesDisplayed}</div>
}

export default CategoryButtons
