import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import Layout from "../components/layout"
import EditCategoryForm from "../components/edit-category-form"
import NewCategoryForm from "../components/new-category-form"
import CategoryList from "../components/category-list"

const EditCategorysPage = () => {
  const noCategory = {
    name: "",
    rank: "",
  }
  const [category, setCategory] = useState(noCategory)
  const [categoryData, setCategoryData] = useState([])

  const loadCategories = () => {
    return firebaseDb
      .collection("categories")
      .get()
      .then(function (querySnapshot) {
        let categoriesArray = []
        querySnapshot.forEach(function (doc) {
          console.log(doc.data())
          categoriesArray.push({
            ...doc.data(),
          })
        })
        setCategoryData(categoriesArray)
      })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <Layout>
      <div className="columns">
        <div className="column is-9">
          <div className="my-4">
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Add Category</h3>
              <NewCategoryForm />
            </div>
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Edit Category</h3>
              <EditCategoryForm
                category={category}
                setCategory={setCategory}
                noCategory={noCategory}
              />
            </div>
          </div>
        </div>
        <div className="i2-3">
          <h3 className="subtitle mt-4">Categorys</h3>
          <CategoryList categoryData={categoryData} setCategory={setCategory} />
        </div>
      </div>
    </Layout>
  )
}

export default EditCategorysPage
