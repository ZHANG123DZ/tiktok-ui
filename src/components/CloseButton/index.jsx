import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss"
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function CloseButton({onClick}) {

  return (
    <div
        className={styles.DivCloseContainer}
        role="button"
        onClick={() => onClick()}
    >
        <FontAwesomeIcon icon={faXmark} />
    </div>
  )
}

CloseButton.propTypes = {
    onClick: PropTypes.func,
}

export default CloseButton
