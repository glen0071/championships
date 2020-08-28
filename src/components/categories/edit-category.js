import React, { useContext } from "react"
import firebaseDb from "../../utils/firebaseDb"

import CategoriesContext from "../../contexts/categories-context"

import CategoryForm from "../categories/category-form"

const EditCategoryForm = () => {
  const { setCategory, category, blankCategory } = useContext(CategoriesContext)

  const updateCategoryInFirebase = event => {
    event.preventDefault()
    firebaseDb
      .collection("categories")
      .doc(category.id)
      .set(category)
      .then(() => {
        setCategory(blankCategory)
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <CategoryForm onClickAction={updateCategoryInFirebase} />
    </>
  )
}

export default EditCategoryForm
