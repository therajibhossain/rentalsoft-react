import ReactModal from "react-modal";

export default function ConfirmModal(props) {

    return(
        <ReactModal isOpen={props.isOpen} ariaHideApp={false}>
            <h3>{props.modalTitle}</h3>
            <p>{props.priceTitle}</p>
            <p>Do you want to procedure?</p>

            <button onClick={props.handleCloseModal} className="m-2 btn btn-sm btn-danger">No</button>
            <button onClick={props.handleCloseModal} className="m-2 btn btn-sm btn-success">Confirm</button>
        </ReactModal>
    );
}