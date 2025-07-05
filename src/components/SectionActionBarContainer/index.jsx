import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SectionActionBarContainer() {
  return (
    <section className="SectionActionBarContainer">
      <div className="DivAvatarActionItemContainer">
        {/* <NavLink to={ }></Nav> */}
        <button className="Button-StyledAvatarFollowButton">
          <div className="ButtonContent">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </button>
      </div>
      <button className="ButtonActionItem">
        <span className="SpanIconWrapper">
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <strong className="StrongText"></strong>
      </button>
      <a href="">
        <div className="MusicCoverDisc"></div>
      </a>
    </section>
  );
}

export default SectionActionBarContainer;
