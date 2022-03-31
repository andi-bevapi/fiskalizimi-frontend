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
    title : "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" + title + "</h5>",
    text,
    icon,
    showCancelButton: true,
    showConfirmButton: confirmButtonText === "" ? false : true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "<span style='font-family: Poppins;'>" + cancelButtonText + "</span>",
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmHandler(identifier);
    } else if (result.isDismissed) {
      cancelHandler();
    }
  });
};
