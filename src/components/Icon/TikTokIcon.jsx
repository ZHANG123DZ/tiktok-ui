const TikTokIcon = ({ width = 48, height = 48 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 256 256"
    fill="none"
  >
    {/* Lớp bóng đỏ */}
    <path
      d="M168,106a95.9,95.9,0,0,0,56,18V84a56,56,0,0,1-56-56H128V156a28,28,0,1,1-40-25.3V89.1A68,68,0,1,0,168,156Z"
      fill="#FE2C55"
      transform="translate(-3,-1)"
      opacity="0.8"
    />
    {/* Lớp bóng xanh dương */}
    <path
      d="M168,106a95.9,95.9,0,0,0,56,18V84a56,56,0,0,1-56-56H128V156a28,28,0,1,1-40-25.3V89.1A68,68,0,1,0,168,156Z"
      fill="#25F4EE"
      transform="translate(3,1)"
      opacity="0.8"
    />
    {/* Biểu tượng chính màu đen */}
    <path
      d="M168,106a95.9,95.9,0,0,0,56,18V84a56,56,0,0,1-56-56H128V156a28,28,0,1,1-40-25.3V89.1A68,68,0,1,0,168,156Z"
      fill="#000000"
    />
  </svg>
);

export default TikTokIcon;
