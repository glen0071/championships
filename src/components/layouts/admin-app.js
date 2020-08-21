import React, { useEffect, useState } from "react"
import firebaseDb from "../../utils/firebaseDb"

import LocationContext from "../../contexts/location-context"
import CategoriesContext from "../../contexts/categories-context"
import OrgsContext from "../../contexts/orgs-context"

const App = ({ children }) => {
  const [locationList, setLocationList] = useState([])
  const [displayedOrgList, setDisplayedOrgList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [orgList, setOrgList] = useState([])
  const [showEditOrgModal, setShowEditOrgModal] = useState(false)
  const [showNewOrgModal, setShowNewOrgModal] = useState(false)
  const noLocation = {
    name: "",
  }
  const blankOrgForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    services: [{ name: "" }],
    published: false,
    categories: [],
    locations: [],
  }
  const [orgToEdit, setOrgToEdit] = useState(blankOrgForm)
  const [locationToEdit, setLocationToEdit] = useState(noLocation)

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

  const loadLocations = () => {
    return firebaseDb
      .collection("locations")
      .get()
      .then(function (querySnapshot) {
        let locationsArray = []
        querySnapshot.forEach(function (doc) {
          locationsArray.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setLocationList(locationsArray)
      })
  }

  useEffect(() => {
    loadLocations()
    loadCategories()
    loadOrgs()
  }, [])

  return (
    <OrgsContext.Provider
      value={{
        displayedOrgList: displayedOrgList,
        setDisplayedOrgList: setDisplayedOrgList,
        orgToEdit: orgToEdit,
        setOrgToEdit: setOrgToEdit,
        showEditOrgModal: showEditOrgModal,
        showNewOrgModal: showNewOrgModal,
        setShowNewOrgModal: setShowNewOrgModal,
        setShowEditOrgModal: setShowEditOrgModal,
      }}
    >
      <CategoriesContext.Provider
        value={{
          categoryList: categoryList,
          setCategoryList: setCategoryList,
        }}
      >
        <LocationContext.Provider
          value={{
            locationList: locationList,
            noLocation: noLocation,
            locationToEdit: locationToEdit,
            setLocationToEdit: setLocationToEdit,
          }}
        >
          {children}
        </LocationContext.Provider>
      </CategoriesContext.Provider>
    </OrgsContext.Provider>
  )
}

export default App
