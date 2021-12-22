import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSpotForm from "../editSpotForm/EditSpotForm";

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="single-spot-button" onClick={() => setShowModal(true)}>
        <i class="far fa-edit"></i>Edit Spot
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
