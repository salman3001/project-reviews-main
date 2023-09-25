import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js'

export const toast = () => {
  if (document.getElementById('message')) {
    const type = (document.getElementById('message') as HTMLDivElement).dataset.type as string
    const duration = (document.getElementById('message') as HTMLDivElement).dataset
      .duration as string
    const text = document.getElementById('message')?.innerText

    const avatar =
      type === 'error'
        ? '/images/toast-error.svg'
        : type === 'success'
        ? '/images/toast-success.svg'
        : type === 'warning'
        ? '/images/toast-warning.svg'
        : ''

    const className =
      type === 'error'
        ? 'toastError'
        : type === 'success'
        ? 'toastSuccess'
        : type === 'warning'
        ? 'toastWarning'
        : ''

    Toastify({
      text: text,
      duration: Number(duration) || 3000,
      newWindow: true,
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      className,
      avatar,
      onClick: function () {}, // Callback after click
    }).showToast()
  }
}
