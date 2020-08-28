import React, { useContext } from "react"

import CategoriesContext from "../../contexts/categories-context"

const EditCategoryForm = ({ onClickAction }) => {
  const { setCategory, category } = useContext(CategoriesContext)

  function updateCategoryData(event) {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
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
          id="edit-category-form-name"
          name="name"
          placeholder="name"
          type="text"
          onChange={updateCategoryData}
          className="input"
          value={category.name}
        />
        <input
          id="edit-category-form-rank"
          name="rank"
          type="number"
          placeholder="rank"
          onChange={updateCategoryData}
          className="input"
          value={category.rank}
        />
        <div className="button my-2 is-info" onClick={onClickAction}>
          Save Category
        </div>
      </form>
    </>
  )
}

export default EditCategoryForm
