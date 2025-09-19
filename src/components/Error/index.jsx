import styles from './Error.module.scss';

function Error({ icon, desc, title }) {
  return (
    <div className={styles.DivErrorContainer}>
      {icon}
      <p className={styles.PTitle}>{title}</p>
      <p className={styles.PDesc}>{desc}</p>
    </div>
  );
}

export default Error;
