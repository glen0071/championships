import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

const CategoryButton = ({ cat }) => {
  return (
    <div onClick={() => console.log({ cat })} className="button column is-full">
      {cat.name}
    </div>
  )
}

const CategoryButtons = () => {
  const [categoryData, setCategoryData] = useState([])

  const loadCategories = () => {
    firebaseDb
      .collection("categories")
      .get()
      .then(function (querySnapshot) {
        let categoriesArray = []
        querySnapshot.forEach(function (doc) {
          categoriesArray.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setCategoryData(categoriesArray)
      })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const categories = categoryData.map(cat => (
    <CategoryButton key={cat.id} cat={cat} />
  ))

  return <div className="buttons columns">{categories}</div>
}

export default CategoryButtons
