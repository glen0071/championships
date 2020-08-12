import React from "React"

const Org = ({ org }) => {
  return (
    <div className="card my-2 px-4">
      <h3 className="is-size-4 has-text-weight-bold">{org.name}</h3>
      <p>{`Locations: ${org.locations.join(" ")}`}</p>
      <p>{`Phone: ${org.phone}`}</p>

      <p>Services:</p>
      <ul>
        {org.services.map(service => (
          <li className="li">{service}</li>
        ))}
      </ul>
    </div>
  )
}

export default Org
