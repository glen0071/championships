import React from "React"

const Org = ({ org }) => {
  return (
    <div
      className="card my-2 px-4 column is-half has-text-centered"
      style={orgCard}
    >
      <h3 className="is-size-4 has-text-weight-bold">{org.name}</h3>
      <div>{org.locations.join(" • ")}</div>
      <div>{org.phone}</div>

      <ul>
        <span className="has-text-weight-bold">Services:</span>
        {org.services.map(service => (
          <div>{service}</div>
        ))}
      </ul>
    </div>
  )
}

const orgCard = {
  border: "solid 1px #085064",
}

export default Org
