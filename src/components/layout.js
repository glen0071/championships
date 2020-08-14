import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import firebaseDb from "../utils/firebaseDb"

import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"
import HamburgerNav from "./hamburger-nav"
import ResourcesContext from "./resource-context"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(
    "All Reentry Resources"
  )
  const [displayedOrgList, setDisplayedOrgList] = useState([])
  const [orgList, setOrgList] = useState([])

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
    <>
      <ResourcesContext.Provider value={categoryList}>
        <HamburgerNav />
        <Header />
        <main className="container">
          <div className="columns">
            <div className="column is-3 is-hidden-mobile">
              <Sidebar
                selectCategory={selectCategory}
                selectedCategory={selectedCategory}
              />
            </div>
            <div className="column is-9">
              <h1 className="title is-3">{selectedCategory}</h1>
              <h1 className="subtitle">
                We hope you find these re sources helpful
              </h1>
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </ResourcesContext.Provider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
