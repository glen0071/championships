import React, { useState, useEffect } from "react"
import firebaseDb from "../utils/firebaseDb"

const OrgForm = () => {
  const blankOrgForm = {
    name: "",
    email: "",
    phone: "",
    name: "",
  }

  const [categoryData, setCategoryData] = useState([])
  const [newOrgData, setNewOrgData] = useState({})
  const formFields = ["name", "email", "phone"]

  const inputs = formFields.map(field => (
    <div className="field" key={field}>
      <div className="control">
        <input
          className="input"
          placeholder={field}
          id={field}
          name={field}
        ></input>
      </div>
    </div>
  ))

  const loadCategories = () => {
    return firebaseDb
      .collection("categories")
      .get()
      .then(function (querySnapshot) {
        let categoriesArray = []
        querySnapshot.forEach(function (doc) {
          categoriesArray.push(doc.data().name)
        })
        setCategoryData(categoriesArray)
      })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const catOptions = categoryData.map(cat => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))

  return (
    <>
      <form>
        {inputs}
        <select id="category" name="category" className="select">
          {catOptions}
        </select>
      </form>
    </>
  )
}

export default OrgForm
