import React, { useContext } from "react"
import CategoriesContext from "../../contexts/categories-context"

const Category = ({ category, setCategory }) => {
  const blankCategory = {
    name: "",
    rank: "",
    info: [{ text: "" }],
  }

  const clickCategory = category => {
    console.log(category)

    setCategory({
      ...blankCategory,
      name: category.name,
      rank: category.rank,
      id: category.id,
    })
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
        className="button is-small mx-4 my-1"
      >
        {category.name}
      </div>
    </>
  )
}

const CategoryList = () => {
  const { categoryList, setCategory } = useContext(CategoriesContext)

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
