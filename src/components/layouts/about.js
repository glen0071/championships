import React from "react"

import SEO from "../layouts/seo"

const AboutPage = () => {
  return (
    <>
      <SEO title="About" />
      <div className="title mt-4 mx-2">Reentry Minnesota</div>
      <div className="subtitle mt-4 mx-2">
        A growing collection of resources for people impacted by the legal
        system.
      </div>
      <div className="container">
        <p className="my-5">
          Built by{" "}
          <a target="_blank" rel="noopener" href="https://eddieglenn.com">
            Eddie Glenn
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noopener"
            href="https://www.linkedin.com/in/amandasperow/"
          >
            Amanda Sperow
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noopener"
            href="https://mitchellhamline.edu/biographies/person/jon-geffen/"
          >
            Jon Geffen
          </a>
          , and{" "}
          <a
            target="_blank"
            rel="noopener"
            href="https://mitchellhamline.edu/biographies/person/bradford-colbert/"
          >
            Brad Colbert
          </a>
        </p>
        <p>
          You can{" "}
          <a target="_blank" rel="noopener" href="mailto:eddie@eddieglenn.com">
            email Eddie
          </a>{" "}
          with questions or suggestions on how this site could be more helpful.
        </p>
      </div>
    </>
  )
}

export default AboutPage
