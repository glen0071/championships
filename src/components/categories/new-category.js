import React, { useContext } from "react"
import firebaseDb from "../../utils/firebaseDb"

import CategoriesContext from "../../contexts/categories-context"

import CategoryForm from "../categories/category-form"

const NewCategoryForm = () => {
  const { category } = useContext(CategoriesContext)

  const addCategoryToFirebase = event => {
    event.preventDefault()
    firebaseDb
      .collection("categories")
      .add(category)
      .then(function (docRef) {
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <CategoryForm onClickAction={addCategoryToFirebase} />
    </>
  )
}

export default NewCategoryForm
