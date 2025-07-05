import styles from './styles.module.scss';

function Loading() {
  return (
    <div className={styles.DivLoading}>
      <svg
        className={styles.SvgContainer}
        preserveAspectRatio="none"
        viewBox="0 0 200 200"
        width={'48px'}
        height={'48px'}
      >
        <defs>
          <mask
            id="redhole"
            style={{ width: '48px', height: '48px', margin: 'auto' }}
          >
            <rect style={{ width: '100%', height: '100%' }} fill="white"></rect>
            <circle
              className={styles.CircleRedHole}
              r={'36'}
              cy={'99'}
              cx={'128'}
            ></circle>
          </mask>
          <mask
            id="bluehole"
            style={{ width: '48px', height: '48px', margin: 'auto' }}
          >
            <rect style={{ width: '100%', height: '100%' }} fill="white"></rect>
            <circle
              className={styles.CircleBlueHole}
              r={'36'}
              cy={'99'}
              cx={'60'}
            ></circle>
          </mask>
        </defs>
        <circle
          className={styles.CircleBlack}
          strokeWidth="2"
          stroke="#3AF2FF"
          r={'36'}
          cy={'99'}
          cx={'60'}
        ></circle>
        <circle
          className={styles.CircleBlue}
          r={'36'}
          cy={'99'}
          cx={'60'}
        ></circle>
        <circle
          className={styles.CircleRed}
          r={'36'}
          cy={'99'}
          cx={'128'}
        ></circle>
      </svg>
    </div>
  );
}

export default Loading;
