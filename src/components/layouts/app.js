import React, { useEffect, useState } from "react"

import firebaseDb from "../utils/firebaseDb"
import CategoriesContext from "../contexts/categories-context"
import OrgsContext from "../contexts/orgs-context"

const App = ({ children }) => {
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
    <CategoriesContext.Provider
      value={{
        categoryList: categoryList,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        selectCategory: selectCategory,
      }}
    >
      <OrgsContext.Provider value={{ displayedOrgList: displayedOrgList }}>
        {children}
      </OrgsContext.Provider>
    </CategoriesContext.Provider>
  )
}

export default App
