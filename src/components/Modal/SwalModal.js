import Swal from "sweetalert2";

export const SwalModal = (
  title,
  text,
  icon,
  cancelBtn,
  confBtn,
  cancelBtnFunc,
  confBtnFunc,
  index
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    showConfirmButton: confBtn === "" ? false : true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: cancelBtn,
    confirmButtonText: confBtn,
  }).then((result) => {
    if (result.isConfirmed) {
      confBtnFunc(index);
    } else if (result.isDismissed) {
      cancelBtnFunc();
    }
  });
};
