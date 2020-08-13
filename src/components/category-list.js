import React, { useEffect } from "react"

const Category = ({ category, setCategory }) => {
  const selectCategory = category => {
    console.log(category)
    setCategory(category)
  }

  return (
    <>
      <div
        name={category.name}
        key={category.id}
        id={category.id}
        onClick={() => {
          selectCategory(category)
        }}
      >
        {category.name}
      </div>
    </>
  )
}

const CategoryList = ({ categoryData, setCategory }) => {
  const categories = categoryData ? categoryData : []

  useEffect(() => {
    console.log(categories)
    console.log("here")
  }, [])

  return (
    <>
      {categories
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
