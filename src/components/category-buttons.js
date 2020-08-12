import React, { useState, useEffect } from "react"

const CategoryButton = ({ category }) => {
  return (
    <div
      onClick={() => console.log({ category })}
      className="button column is-full"
    >
      {category.name}
    </div>
  )
}

const CategoryButtons = ({ categoryList }) => {
  const categories = categoryList ? categoryList : []

  const categoriesDisplayed = categories.map(category => (
    <CategoryButton key={category.id} category={category} />
  ))

  return <div className="buttons columns">{categoriesDisplayed}</div>
}

export default CategoryButtons
