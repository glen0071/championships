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

  const addParagraph = event => {
    event.preventDefault()
    setCategory({
      ...category,
      info: category.info.concat({ text: "" }),
    })
  }

  const updateInfo = event => {
    setCategory({
      ...category,
      info: category.info.map((info, infoIndex) => {
        if (parseInt(event.target.dataset.index) !== infoIndex) {
          return info
        } else {
          return {
            ...info,
            text: event.target.value,
          }
        }
      }),
    })
  }

  return (
    <>
      <form>
        {category.info.map((infoObject, index) => (
          <textarea
            id={`edit-category-form-info-${index}`}
            key={category.id + "InfoParagraph" + index + 1}
            name="info"
            placeholder={`info paragraph ${index + 1}`}
            onChange={event => updateInfo(event)}
            className="textarea"
            data-index={index}
            value={infoObject.text}
          />
        ))}
        <button onClick={addParagraph}>Add Another Paragraph</button>
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
