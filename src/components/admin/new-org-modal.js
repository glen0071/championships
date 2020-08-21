import React, { useContext } from "react"
import OrgsContext from "../../contexts/orgs-context"

import NewOrgForm from "../orgs/new-org-form"

const NewOrgModal = () => {
  const { showNewOrgModal, setShowNewOrgModal } = useContext(OrgsContext)

  return (
    <div className={`modal ${showNewOrgModal ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">New Organization</p>
          <button
            className="delete"
            onClick={() => setShowNewOrgModal(false)}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <NewOrgForm />
        </section>
        <footer className="modal-card-foot">
          <div className="button is-success">Save changes</div>
          <div
            onClick={() => {
              console.log("new")
              setShowNewOrgModal(false)
            }}
            className="button is-success"
          >
            Cancel
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NewOrgModal
