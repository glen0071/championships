import React, { useEffect, useState } from "react"

import firebaseDb from "../../utils/firebaseDb"
import CategoriesContext from "../../contexts/categories-context.js"
import OrgsContext from "../../contexts/orgs-context"
import AboutContext from "../../contexts/about-context"

const App = ({ children }) => {
  const defaultCategory = {
    name: "All Reentry Resources",
    info: [{ text: "" }],
  }
  const [categoryList, setCategoryList] = useState([])
  const [showAbout, setShowAbout] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)
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
      .where("published", "==", true)
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
      setSelectedCategory({
        name: "All Reentry Resources",
        info: [{ text: "" }],
      })
    } else {
      setDisplayedOrgList(
        orgList.filter(org => {
          // TODO: only checks first in array, make this check all cats
          return org.categories[0] === category.name
        })
      )
      setSelectedCategory(category)
    }
  }

  useEffect(() => {
    loadOrgs()
    loadCategories()
  }, [])

  return (
    <CategoriesContext.Provider
      value={{
        categoryList: categoryList,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        selectCategory: selectCategory,
        defaultCategory: defaultCategory,
      }}
    >
      <OrgsContext.Provider value={{ displayedOrgList: displayedOrgList }}>
        <AboutContext.Provider
          value={{
            showAbout: showAbout,
            setShowAbout: setShowAbout,
          }}
        >
          {children}
        </AboutContext.Provider>
      </OrgsContext.Provider>
    </CategoriesContext.Provider>
  )
}

export default App
