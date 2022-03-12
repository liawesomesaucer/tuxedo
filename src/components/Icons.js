export function CrossButton({ onClick }) {
  return (
    <button className="tuxedo__icon-button" onClick={onClick}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.646484 15.7886L15.7886 0.646499" stroke="#F8BF90" />
        <path d="M15.7886 15.7886L0.646438 0.646499" stroke="#F8BF90" />
      </svg>
    </button>
  );
}

export function PlusButton({ onClick }) {
  return (
    <button className="tuxedo__icon-button" onClick={onClick}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="8.5" x2="8.5" y2="17" stroke="#F8BF90" />
        <line y1="8.5" x2="17" y2="8.5" stroke="#F8BF90" />
      </svg>
    </button>
  );
}

export function LeftIcon() {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 18.5V1L1 9L15.5 18.5Z" stroke="#F8BF90" />
      <path d="M12.5 13.5V5.5L6 9L12.5 13.5Z" stroke="#F8BF90" />
    </svg>
  );
}

export function RightIcon() {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 18.5V1L15.5 9L1 18.5Z" stroke="#F8BF90" />
      <path d="M4 13.5V5.5L10.5 9L4 13.5Z" stroke="#F8BF90" />
    </svg>
  );
}

export function LetterIcon({ letter }) {
  return (
    <span className="tuxedo__blocked-site-icon tuxedo__blocked-site-icon-letter">
      {letter}
    </span>
  );
}
