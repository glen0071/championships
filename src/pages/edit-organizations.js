import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"

import OrgForm from "../components/org-form"

const AddDataPage = () => {
  const [categoryList, setCategoryList] = useState([])
  const [locationList, setLocationList] = useState([])
  const [serviceList, setServiceList] = useState([])

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

  const loadServices = () => {
    return firebaseDb
      .collection("services")
      .get()
      .then(function (querySnapshot) {
        let servicesArray = []
        querySnapshot.forEach(function (doc) {
          servicesArray.push(doc.data().name)
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
          locationsArray.push(doc.data().name)
        })
        setLocationList(locationsArray)
      })
  }

  useEffect(() => {
    loadServices()
    loadLocations()
    loadCategories()
  }, [])

  return (
    <AdminLayout>
      <div className="column">
        <div className="my-4 has-background-grey-lighter">
          <div className="px-4 py-1 ">
            <h3 className="subtitle mt-6">Add Organization</h3>
            <OrgForm
              serviceList={serviceList}
              locationList={locationList}
              categoryList={categoryList}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddDataPage
