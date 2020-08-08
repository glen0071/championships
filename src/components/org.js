import React from "React"

const Org = ({ org }) => {
  return (
    <div className="card my-2">
      <h3 className="subtitle">{org.name}</h3>
      <p>email: ___</p>
      <p>phone: ___</p>
      <p>Services: ___</p>
      <p>Locations: ___</p>
    </div>
  )
}

export default Org
