import styles from "./styles.module.scss"

function Avatar({data}) {
  return (
    <div className={styles.DivAvatarWrapper}>
      <div className={styles.DivTriggerWrapper}>
        <a href="#"></a>
        <span className={styles.SpanAvatarContainer} style={{width: '40px', height: '40px'}}>
            <img src="#" alt="" className={styles.ImgAvatar}/>
        </span>
      </div>
    </div>
  )
}

export default Avatar
