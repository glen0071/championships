import React, { useEffect } from "react"

const Location = ({ location, setLocation }) => {
  const selectLocation = location => {
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

  return (
    <>
      {locations
        .sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
        .map(location => (
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
