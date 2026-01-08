import Swal, { type SweetAlertIcon } from 'sweetalert2'

export const toaster = (msg: string, icon: SweetAlertIcon, timer: number = 5000) => {
    Swal.fire({
        icon,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        title: msg,
        theme: 'bootstrap-5',
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
}
