import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import {
  deletePost,
  getPosts,
  updatePost,
} from '../../services/Posts/posts.service';

function PopoverArticle({ data, active, setPosts, setActive }) {
  const delPost = async () => {
    try {
      await deletePost(data.id);
      const posts = await getPosts();
      setPosts(posts);
      setActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  const upPost = async () => {
    const newContent = prompt('Nhập nội dung post bạn muốn sửa', data.content);
    try {
      await updatePost(data.id, { content: newContent });
      const posts = await getPosts();
      setPosts(posts);
      setActive(false);
    } catch (error) {
      console.log(error);
    }
  };
  const modalRoot = document.querySelector('body');

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={
        active &&
        clsx(
          'TUXPopover-popover',
          'TUXPopover-popover--open',
          'TUXPopover-popover--dark'
        )
      }
      style={{
        transition: 'opacity 300ms cubic-bezier(0.65, 0, 0.35, 1)',
        zIndex: '3001',
        position: 'fixed',
        left: '0px',
        top: '0px',
        transform: 'translate(298px, 97px',
      }}
    >
      <div className="TUXPopover-content">
        <div
          style={{
            padding: '8px 16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            label="Xoá bài đăng"
            borderless
            size="medium"
            secondary
            onClick={() => delPost()}
          />
          <Button
            icon={<FontAwesomeIcon icon={faPen} />}
            label="Sửa bài đăng"
            borderless
            size="medium"
            secondary
            onClick={() => upPost()}
          />
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default PopoverArticle;
