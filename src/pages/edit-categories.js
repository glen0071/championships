import React, { useState } from "react"

import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"

import EditCategoryForm from "../components/categories/edit-category-form"
import NewCategoryForm from "../components/categories/new-category-form"
import CategoryList from "../components/categories/category-list"

const EditCategoriesPage = () => {
  return (
    <AdminLayout>
      <div className="columns">
        <div className="column is-9">
          <div className="my-4">
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Add Category</h3>
            </div>
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Edit Category</h3>
              <EditCategoryForm />
            </div>
          </div>
        </div>
        <div className="i2-3">
          <h3 className="subtitle mt-4">Select Category to Edit</h3>
          <CategoryList />
        </div>
      </div>
    </AdminLayout>
  )
}

export default EditCategoriesPage
