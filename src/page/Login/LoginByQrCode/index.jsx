import { QRCodeCanvas } from 'qrcode.react';
import styles from './LoginByQrCode.module.scss';

const LoginByQrCode = () => {
  return (
    <div className={styles.DivLoginContainer}>
      <h2 data-e2e="qr-page-title" className={styles.H2Title}>
        Đăng nhập bằng mã QR
      </h2>

      <div className={styles.DivQRContentBody}>
        <div className={styles.DivTextContainer}>
          {/* Mã QR */}
          <div data-e2e="qr-code" className={styles.DivCodeImage}>
            {/* <canvas
              height="212"
              width="212"
              style={{
                height: '170px',
                width: '170px',
                borderRadius: '11px',
                background: '#fff',
                padding: '12px',
              }}
            ></canvas> */}
            <QRCodeCanvas
              value={'Tớ thích cậu 😘'}
              size={212}
              style={{
                height: '170px',
                width: '170px',
                borderRadius: '11px',
                background: '#fff',
                padding: '12px',
              }}
            ></QRCodeCanvas>
          </div>

          {/* Hướng dẫn */}
          <div data-e2e="qr-body" className={styles.DivStepContainer}>
            <p className={styles.PStep}>
              1. Quét bằng máy ảnh trên thiết bị di động của bạn
            </p>
            <p className={styles.PStep}>2. Xác nhận đăng nhập hoặc đăng ký</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginByQrCode;
