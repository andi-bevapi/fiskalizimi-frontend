import Swal from "sweetalert2";

export const SwalModal = (
  title,
  text,
  icon,
  cancelButtonText,
  confirmButtonText,
  cancelHandler,
  confirmHandler,
  identifier
) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    showConfirmButton: confirmButtonText === "" ? false : true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText,
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmHandler(identifier);
    } else if (result.isDismissed) {
      cancelHandler();
    }
  });
};
