import React, { useEffect } from "react"

const Location = ({ location, setLocation }) => {
  const selectLocation = location => {
    console.log(location, "here")
    setLocation(location)
  }

  return (
    <>
      <div
        name={location.name}
        key={location.id}
        id={location.id}
        onClick={() => {
          selectLocation(location)
        }}
      >
        {location.name}
      </div>
    </>
  )
}

const LocationList = ({ locationData, setLocation }) => {
  const locations = locationData ? locationData : []

  useEffect(() => {
    console.log(locations)
    console.log("here")
  }, [])

  return (
    <>
      {locations.map(location => (
        <Location
          location={location}
          key={location.id}
          setLocation={setLocation}
        />
      ))}
    </>
  )
}

export default LocationList
