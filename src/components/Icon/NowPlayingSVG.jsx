export default function NowPlayingSVG() {
  return (
    <svg width="50" height="24" viewBox="0 0 50 24" fill="white">
      <rect x="2" y="6" width="4" height="12" rx="2" ry="2">
        <animate
          attributeName="height"
          values="4;18;4"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="10;3;10"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="12" y="6" width="4" height="12" rx="2" ry="2">
        <animate
          attributeName="height"
          values="4;18;4"
          dur="1s"
          begin="0.15s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="10;3;10"
          dur="1s"
          begin="0.15s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="22" y="6" width="4" height="12" rx="2" ry="2">
        <animate
          attributeName="height"
          values="4;18;4"
          dur="1s"
          begin="0.3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="10;3;10"
          dur="1s"
          begin="0.3s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="32" y="6" width="4" height="12" rx="2" ry="2">
        <animate
          attributeName="height"
          values="4;18;4"
          dur="1s"
          begin="0.45s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="10;3;10"
          dur="1s"
          begin="0.45s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="42" y="6" width="4" height="12" rx="2" ry="2">
        <animate
          attributeName="height"
          values="4;18;4"
          dur="1s"
          begin="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="10;3;10"
          dur="1s"
          begin="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
