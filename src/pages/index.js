import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import CategoryContext from "../components/CategoryContext"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import OrgList from "../components/org-list"
import SEO from "../components/seo"

const IndexPage = () => {
  const [orgData, setOrgData] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("addictionServices")

  const loadCategories = () => {
    return firebaseDb
      .collection("categories")
      .get()
      .then(function (querySnapshot) {
        let categoriesArray = []
        querySnapshot.forEach(function (doc) {
          categoriesArray.push(doc.data().name)
        })
        setCategoryList(categoriesArray)
      })
  }

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
        setOrgData(orgsArray)
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
          <Sidebar />
        </div>
        <div className="column is-9">
          <h1 className="title is-3">Category Name</h1>
          <h1 className="subtitle">Category Subtitle</h1>
          <OrgList />
          <div className="content"></div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
