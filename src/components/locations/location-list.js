import React, { useContext } from "react"
import LocationContext from "../../contexts/location-context"
import styled from "styled-components"

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`

const Location = ({ location }) => {
  const { locationToEdit, setLocationToEdit } = useContext(LocationContext)

  const selectLocation = location => {
    setLocationToEdit(location)
  }

  return (
    <Buttons>
      <button
        className="button"
        name={location.name}
        key={location.id}
        id={location.id}
        onClick={() => {
          selectLocation(location)
        }}
      >
        {location.name}
      </button>
    </Buttons>
  )
}

const LocationList = () => {
  const { locationList } = useContext(LocationContext)

  return (
    <>
      {locationList
        .sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
        .map(location => (
          <Location location={location} key={location.id} />
        ))}
    </>
  )
}

export default LocationList
