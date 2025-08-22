import { useRef, useState, useEffect } from 'react';

const VideoPlay = ({ videoUrl, thumbnail }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // phần trăm tiến trình

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  // vòng tròn (SVG Circle)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative w-[200px] h-[200px] flex items-center justify-center rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute w-full h-full object-cover opacity-0"
        playsInline
      />

      {/* Nút Play/Pause */}
      <button
        onClick={togglePlay}
        className="absolute z-10 flex items-center justify-center w-12 h-12 bg-black/50 rounded-full"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M8 5v14l11-7z"></path>
          </svg>
        )}
      </button>

      {/* Progress Circle */}
      <svg className="absolute" width="78" height="78" viewBox="0 0 78 78">
        <circle
          strokeWidth="3"
          stroke="rgba(255,255,255,0.3)"
          fill="transparent"
          r={radius}
          cx="39"
          cy="39"
        />
        <circle
          strokeWidth="3"
          stroke="#fff"
          fill="transparent"
          r={radius}
          cx="39"
          cy="39"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
        />
      </svg>
    </div>
  );
};

export default VideoPlay;
