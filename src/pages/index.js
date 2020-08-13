import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import OrgList from "../components/org-list"
import SEO from "../components/seo"

const IndexPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "All Reentry Resources"
  )
  const [orgList, setOrgList] = useState([])
  const [displayedOrgList, setDisplayedOrgList] = useState([])
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
    if (category.name === "All Reentry Resources") {
      setDisplayedOrgList(orgList)
      setSelectedCategory("All Reentry Resources")
    } else {
      setDisplayedOrgList(
        orgList.filter(org => {
          return org.categories[0] === category.name
        })
      )
      setSelectedCategory(category.name)
    }
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
        setOrgList(orgsArray)
        setDisplayedOrgList(orgsArray)
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
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="column is-9">
          <h1 className="title is-3">{selectedCategory}</h1>
          <h1 className="subtitle">We hope you find these resources helpful</h1>
          {typeof displayedOrgList !== "undefined" &&
          displayedOrgList.length > 0 ? (
            <OrgList orgList={displayedOrgList} />
          ) : (
            <div>We can't find resources fitting this category.</div>
          )}
          <div className="content"></div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
