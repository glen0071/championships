import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import OrgList from "../components/org-list"
import SEO from "../components/seo"

const IndexPage = () => {
  const [orgList, setOrgList] = useState([])
  const [filteredOrgList, setFilteredOrgList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categoryList, setCategoryList] = useState([])

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
        setCategoryList(categoriesArray)
      })
  }

  const selectCategory = category => {
    console.log(orgList[0].categories)
    console.log(category)
  }

  const filterOrgs = category => {}

  const loadOrgs = () => {
    firebaseDb
      .collection("organizations")
      .get()
      .then(function (querySnapshot) {
        let orgsArray = []
        querySnapshot.forEach(function (doc) {
          orgsArray.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setOrgList(orgsArray)
      })
  }

  useEffect(() => {
    loadOrgs()
    loadCategories()
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <div className="columns">
        <div className="column is-3 is-hidden-mobile">
          <Sidebar
            categoryList={categoryList}
            selectCategory={selectCategory}
          />
        </div>
        <div className="column is-9">
          <h1 className="title is-3">Category Name</h1>
          <h1 className="subtitle">Category Subtitle</h1>
          <OrgList orgList={orgList} />
          <div className="content"></div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
