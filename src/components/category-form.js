import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("")

  const updateCategoryName = event => {
    setCategoryName(event.target.value)
  }

  const submitCategory = event => {
    event.preventDefault()
    firebaseDb
      .collection("categories")
      .add({ name: categoryName })
      .then(function (docRef) {
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <form>
        <input
          id="category"
          name="category"
          onChange={updateCategoryName}
          className="input"
          value={categoryName}
        />
        <button className="button" onClick={submitCategory}>
          Save Category
        </button>
      </form>
    </>
  )
}

export default CategoryForm
