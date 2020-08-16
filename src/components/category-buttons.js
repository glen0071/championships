import React, { useContext } from "react"

import CategoriesContext from "../contexts/categories-context"

const CategoryButton = ({ category, classes }) => {
  const { selectCategory } = useContext(CategoriesContext)

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

const CategoryButtons = () => {
  const { categoryList, selectedCategory } = useContext(CategoriesContext)

  const categories = categoryList ? categoryList : []
  const setClasses = category => {
    return category.name === selectedCategory
      ? "button column is-full is-active"
      : "button column is-full"
  }

  const categoriesDisplayed = categories
    .sort((a, b) => {
      if (a.rank > b.rank) return 1
      if (a.rank < b.rank) return -1
      return 0
    })
    .map(category => (
      <CategoryButton
        key={category.id}
        category={category}
        classes={setClasses(category)}
      />
    ))

  return <div className="buttons columns">{categoriesDisplayed}</div>
}

export default CategoryButtons
