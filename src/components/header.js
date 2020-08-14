import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#085064`,
      marginBottom: `1rem`,
    }}
  >
    <div
      style={{
        padding: `1rem 0`,
      }}
    ></div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
