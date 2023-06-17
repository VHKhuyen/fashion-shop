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
          Bạn có chắc chắn muốn xóa sản phẩm này không?
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
            Xóa
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
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
