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
        <footer className="modal-card-foot">
          <div className="button is-success">Save changes</div>
          <div
            onClick={() => {
              console.log('edit')
              setShowEditOrgModal(false)
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

export default EditOrgModal
