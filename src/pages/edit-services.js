import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import "./styles.scss"

import AdminLayout from "../components/layouts/admin-layout"

import EditServiceForm from "../components/services/edit-service-form"
import NewServiceForm from "../components/services/new-service-form"
import ServiceList from "../components/services/service-list"

const EditServicesPage = () => {
  const noService = {
    name: "",
  }
  const [service, setService] = useState(noService)
  const [serviceData, setServiceData] = useState([])

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
        setServiceData(servicesArray)
      })
  }

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <AdminLayout>
      <div className="columns">
        <div className="column is-9">
          <div className="my-4">
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Add Service</h3>
              <NewServiceForm />
            </div>
            <div className="px-4 has-text-centered has-background-grey-lighter py-4 my-4">
              <h3 className="subtitle mt-6">Edit Service</h3>
              <EditServiceForm
                service={service}
                setService={setService}
                noService={noService}
              />
            </div>
          </div>
        </div>
        <div className="i2-3">
          <h3 className="subtitle mt-4">Services</h3>
          <ServiceList serviceData={serviceData} setService={setService} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default EditServicesPage
