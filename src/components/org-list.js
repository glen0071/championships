import React, { useContext } from "react"

import Org from "./org"
import OrgsContext from "./orgs-context"

const OrgList = () => {
  const { orgList, displayedOrgList } = useContext(OrgsContext)

  const orgs = displayedOrgList.map(org => <Org org={org} key={org.id} />)

  return <div className="content columns">{orgs ? orgs : "Coming soon..."}</div>
}

export default OrgList
