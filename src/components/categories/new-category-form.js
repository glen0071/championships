import firebaseDb from "../../utils/firebaseDb"
import React, { useState } from "react"

const NewCategoryForm = () => {
  const [category, setCategory] = useState("")

  function updateCategoryData(event) {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    })
  }

  const submitCategory = event => {
    event.preventDefault()
    firebaseDb
      .collection("categories")
      .add(category)
      .then(function (docRef) {
        console.log("saved")
      })
      .catch(function (error) {
        console.log(error, "sorry")
      })
  }

  return (
    <>
      <form>
        <input
          id="new-category-form-name"
          name="name"
          type="text"
          onChange={updateCategoryData}
          className="input"
          placeholder="name"
          value={category.name}
        />
        <input
          id="new-category-form-rank"
          type="number"
          name="rank"
          onChange={updateCategoryData}
          className="input"
          placeholder="rank"
          value={category.rank}
        />
        <button className="button is-info my-2" onClick={submitCategory}>
          Save Category
        </button>
      </form>
    </>
  )
}

export default NewCategoryForm
