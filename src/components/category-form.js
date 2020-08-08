import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

const CategoryForm = () => {
  const blankCategoryForm = { name: "" }
  const [categoryData, setCategoryData] = useState(blankCategoryForm)

  const loadCategories = () => {
    firebaseDb
      .collection("categories")
      .get()
      .then(function (querySnapshot) {
        let categoriesArray = []
        querySnapshot.forEach(function (doc) {
          categoriesArray.push(doc.data().name)
        })
        setCategoryData(categoriesArray)
      })
  }

  const updateCategoryData = event => {
    setCategoryData({ name: event.target.value })
  }

  const submitCategory = event => {
    event.preventDefault()
    console.log("jere!")
    firebaseDb
      .collection("categories")
      .add(categoryData)
      .then(function (docRef) {
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <>
      <form>
        <input
          id="category"
          name="category"
          onChange={updateCategoryData}
          className="input"
          value={categoryData.name}
        />
        <button className="button" onClick={submitCategory}>
          Save Category
        </button>
      </form>
    </>
  )
}

export default CategoryForm
