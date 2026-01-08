import Swal, { type SweetAlertIcon } from 'sweetalert2'

export const toaster = (msg: string, icon: SweetAlertIcon) => {
    Swal.fire({
        icon,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        title: msg,
        theme: 'bootstrap-5',
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
}
