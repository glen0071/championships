import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

import Org from "./Org"

const OrgList = () => {
  const [orgData, setOrgData] = useState([])

  const orgs = orgData.map(org => <Org />)

  const loadOrgs = () => {
    firebaseDb
      .collection("orgByCategory")
      .doc("VUW0JTb1OsoSLXATOmfW")
      .collection("addictionServices")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data())
        })
      })
  }

  useEffect(() => {
    loadOrgs()
  }, [])

  return <>{orgs}</>
}

export default OrgList
