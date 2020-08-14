import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import firebaseDb from "../utils/firebaseDb"
import ResourcesContext from "./resource-context"
import OrgsContext from "./orgs-context"

import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"
import HamburgerNav from "./hamburger-nav"

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

  const selectCategory = category => {
    if (category.name === "All Reentry Resources") {
      setDisplayedOrgList(orgList)
      setSelectedCategory("All Reentry Resources")
    } else {
      setDisplayedOrgList(
        orgList.filter(org => {
          // TODO: only checks first in array, make this check all cats
          return org.categories[0] === category.name
        })
      )
      setSelectedCategory(category.name)
    }
  }

  useEffect(() => {
    loadOrgs()
    loadCategories()
  }, [])

  return (
    <>
      <ResourcesContext.Provider
        value={{
          categoryList: categoryList,
          setSelectedCategory: setSelectedCategory,
          selectCategory: selectCategory,
        }}
      >
        <OrgsContext.Provider value={{ displayedOrgList: displayedOrgList }}>
          <HamburgerNav />
          <Header />
          <main className="container">
            <div className="columns">
              <div className="column is-3 is-hidden-mobile">
                <Sidebar selectedCategory={selectedCategory} />
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
        </OrgsContext.Provider>
      </ResourcesContext.Provider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
