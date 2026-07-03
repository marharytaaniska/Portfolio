export function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.7754 4.99805L13.3857 12.3877L20.5547 19.5566L19.5566 20.5547L12.3877 13.3857L5.21875 20.5547L4.2207 19.5566L11.3896 12.3877L4 4.99805L4.99805 4L12.3877 11.3896L19.7773 4L20.7754 4.99805Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface ModalCloseButtonProps {
  onClick: () => void
  label: string
}

export function ModalCloseButton({ onClick, label }: ModalCloseButtonProps) {
  return (
    <button type="button" className="modal-close-btn" onClick={onClick} aria-label={label}>
      <CloseIcon />
    </button>
  )
}
