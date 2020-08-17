import React, { useEffect, useState } from "react"
import LocationContext from "../../contexts/location-context"
import ServiceContext from "../../contexts/service-context"
import firebaseDb from "../../utils/firebaseDb"

const App = ({ children }) => {
  const [locationList, setLocationList] = useState([])
  const [displayedOrgList, setDisplayedOrgList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [categoryList, setCategoryList] = useState([])
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

  const loadServices = () => {
    return firebaseDb
      .collection("services")
      .get()
      .then(function (querySnapshot) {
        let servicesArray = []
        querySnapshot.forEach(function (doc) {
          servicesArray.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setServiceList(servicesArray)
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
    loadServices()
    loadLocations()
    loadCategories()
    loadOrgs()
  }, [])

  return (
    <ServiceContext.Provider value={{ serviceList: serviceList }}>
      <LocationContext.Provider value={{ locationList: locationList }}>
        {children}
      </LocationContext.Provider>
    </ServiceContext.Provider>
  )
}

export default App
