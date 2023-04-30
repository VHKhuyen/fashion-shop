import { removeItem } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { modalConfirmSlice } from "../../redux/selector";
import { close } from "../../redux/modalConfirmSlice";

const ModalConfirm = () => {
  const modalConfirm = useSelector(modalConfirmSlice);
  const dispatch = useDispatch();

  return (
    <div
      className={`modal ${
        modalConfirm.status && "visible opacity-100 pointer-events-auto"
      }`}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Are you sure you want to delete this product?
        </h3>
        <p className="py-4">{modalConfirm.item?.name}</p>
        <div className="modal-action">
          <button
            onClick={() => {
              dispatch(removeItem(modalConfirm.item));
              dispatch(
                close({
                  status: false,
                  item: null,
                })
              );
            }}
            className="btn btn-primary opacity-80 text-white"
          >
            Remove
          </button>
          <button
            onClick={() => {
              dispatch(
                close({
                  status: false,
                  item: null,
                })
              );
            }}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
