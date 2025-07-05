import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
  deleteComment,
  getCommentsByPostId,
  updateComment,
} from '../../services/Comments/comments.service';
import { data } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

function Popover({ data, active, setComments, setActive }) {
  const deleteCmt = async () => {
    try {
      await deleteComment(data.post_id, data.id);
      const comments = await getCommentsByPostId(data.post_id);
      setComments(comments);
      setActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCmt = async () => {
    const newContent = prompt(
      'Nhập nội dung comment bạn muốn sửa',
      data.content
    );
    try {
      await updateComment(data.post_id, data.id, { content: newContent });
      const comments = await getCommentsByPostId(data.post_id);
      setComments(comments);
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
            label="Xoá bình luận"
            borderless
            size="medium"
            secondary
            onClick={() => deleteCmt()}
          />
          <Button
            icon={<FontAwesomeIcon icon={faPen} />}
            label="Sửa bình luận"
            borderless
            size="medium"
            secondary
            onClick={() => updateCmt()}
          />
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Popover;
