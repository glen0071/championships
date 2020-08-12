import React from "react"
import firebaseDb from "../utils/firebaseDb"

import Org from "./org"

const OrgList = ({ orgList }) => {

  const orgs = orgList.map(org => <Org org={org} key={org.id} />)

  return <div className="content columns">{orgs}</div>
}

export default OrgList
