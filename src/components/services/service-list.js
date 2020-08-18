import React, { useEffect } from "react"

const Service = ({ service, setService }) => {
  const selectService = service => {
    setService(service)
  }

  return (
    <>
      <div
        name={service.name}
        key={service.id}
        id={service.id}
        onClick={() => {
          selectService(service)
        }}
      >
        {service.name}
      </div>
    </>
  )
}

const ServiceList = ({ serviceData, setService }) => {
  const services = serviceData ? serviceData : []

  return (
    <>
      {services
        .sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
        .map(service => (
          <Service service={service} key={service.id} setService={setService} />
        ))}
    </>
  )
}

export default ServiceList
