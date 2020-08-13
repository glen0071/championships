import React, { useState } from "react"
import firebaseDb, { firebaseDatabase } from "../utils/firebaseDb"

const EditCategoryForm = ({
  categoryToEdit,
  setCategory,
  category,
  noCategory,
}) => {
  function updateCategoryData(event) {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    })
  }

  const updateCategory = event => {
    event.preventDefault()
    firebaseDb
      .collection("categories")
      .doc(category.id)
      .set(category)
      .then(function (docRef) {
        setCategory(noCategory)
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <form>
        <p>{categoryToEdit}</p>
        <input
          id="edit-category-form-name"
          name="name"
          onChange={updateCategoryData}
          className="input"
          value={category.name}
        />
        <input
          id="edit-category-form-order"
          name="order"
          onChange={updateCategoryData}
          className="input"
          value={category.name}
        />
        <button className="button" onClick={updateCategory}>
          Update Category
        </button>
      </form>
    </>
  )
}

export default EditCategoryForm
