import React from "react"

const Footer = () => {
  return (
    <footer className="has-text-centered">
      © {new Date().getFullYear()}, Built by
      {` `}
      <a href="https://www.twitter.com/eddiegdotme">Eddie Glenn</a>
    </footer>
  )
}

export default Footer
