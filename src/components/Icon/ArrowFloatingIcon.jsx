function ArrowFloatingIcon() {
  return (
    <svg
      fill="currentColor"
      aria-hidden="true"
      width="16"
      height="14"
      viewBox="0 0 14 14"
      style={{
        position: 'absolute',
        PointerEvent: 'none',
        left: '15.2px',
        bottom: '99%',
        transform: 'rotate(180deg)',
      }}
    >
      <path
        clipPath="url(#floating-ui-253)"
        fill="none"
        stroke="rgb(105, 105, 105)"
        strokeWidth="3"
        d="M0,0 H14 L9.625,5 Q7,8 4.375,5 Z"
      ></path>
      <path stroke="currentColor" d="M0,0 H14 L9.625,5 Q7,8 4.375,5 Z"></path>
      <clipPath id="floating-ui-253">
        <rect x="-1" y="1" width="16" height="14"></rect>
      </clipPath>
    </svg>
  );
}

export default ArrowFloatingIcon;
