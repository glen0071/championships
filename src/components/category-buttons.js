import React from "react"

const CategoryButton = ({
  category,
  selectCategory,
  classes,
  selectedCategory,
}) => {
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

const CategoryButtons = ({
  categoryList,
  selectCategory,
  selectedCategory,
}) => {
  const categories = categoryList ? categoryList : []

  const setClasses = category => {
    return category.name === selectedCategory
      ? "button column is-full is-active"
      : "button column is-full"
  }

  const categoriesDisplayed = categories.map(category => (
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
