import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import Org from "./Org"

const OrgList = () => {
  const [orgData, setOrgData] = useState([])

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
        setOrgData(orgsArray)
      })
  }

  const orgs = orgData.map(org => <Org org={org} key={org.id} />)

  useEffect(() => {
    loadOrgs()
  }, [])

  return <>{orgs}</>
}

export default OrgList
