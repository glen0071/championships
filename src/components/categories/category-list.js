import React, { useContext } from "react"
import CategoriesContext from "../../contexts/categories-context"

const Category = ({ category, setCategory }) => {
  const clickCategory = category => {
    setCategory(category)
  }

  return (
    <>
      <div
        name={category.name}
        key={category.id}
        id={category.id}
        onClick={() => {
          clickCategory(category)
        }}
      >
        {category.name}
      </div>
    </>
  )
}

const CategoryList = ({ setCategory }) => {
  const { categoryList } = useContext(CategoriesContext)

  return (
    <>
      {categoryList
        .sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
        .map(category => (
          <Category
            category={category}
            key={category.id}
            setCategory={setCategory}
          />
        ))}
    </>
  )
}

export default CategoryList
