import React, { useContext } from "react"

import CategoriesContext from "../../contexts/categories-context"

const IntroInfo = () => {
  const { selectedCategory } = useContext(CategoriesContext)

  return (
    <div>
      {selectedCategory.info !== undefined
        ? selectedCategory.info.map((infoObject, index) => (
            <p key={selectedCategory.name + "-" + index}>{infoObject.text}</p>
          ))
        : null}
    </div>
  )
}

export default IntroInfo
