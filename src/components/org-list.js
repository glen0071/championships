import React, { useEffect, useState } from "react"
import firebaseDb from "../utils/firebaseDb"

import Org from "./org"

const OrgList = () => {
  const [orgList, setOrgList] = useState([])
  const [displayedOrgList, setDisplayedOrgList] = useState([])

  const loadOrgs = () => {
    firebaseDb
      .collection("organizations")
      .get()
      .then(function (querySnapshot) {
        let orgsArray = []
        querySnapshot.forEach(function (doc) {
          orgsArray.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setOrgList(orgsArray)
        setDisplayedOrgList(orgsArray)
      })
  }

  useEffect(() => {
    loadOrgs()
  }, [])

  const orgs = orgList.map(org => <Org org={org} key={org.id} />)

  return <div className="content columns">{orgs}</div>
}

export default OrgList
