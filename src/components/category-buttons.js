import React, { useState, useEffect } from "react"

const CategoryButton = ({ cat }) => {
  return (
    <div onClick={() => console.log({ cat })} className="button column is-full">
      {cat.name}
    </div>
  )
}

const CategoryButtons = ({ categoryList }) => {
  const categories = categoryList ? categoryList : []

  const categoriesDisplayed = categories.map(cat => (
    <CategoryButton key={cat.id} cat={cat} />
  ))

  return <div className="buttons columns">{categoriesDisplayed}</div>
}

export default CategoryButtons
