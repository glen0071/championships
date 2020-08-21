import React, { useContext } from "react"
import OrgsContext from "../../contexts/orgs-context"

import EditOrgForm from "../orgs/edit-org-form"

const EditOrgModal = () => {
  const { showEditOrgModal, setShowEditOrgModal } = useContext(OrgsContext)

  return (
    <div className={`modal ${showEditOrgModal ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Organization</p>
          <button
            className="delete"
            onClick={() => setShowEditOrgModal(false)}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <EditOrgForm />
        </section>
      </div>
    </div>
  )
}

export default EditOrgModal
