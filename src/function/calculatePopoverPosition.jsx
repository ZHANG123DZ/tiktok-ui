import ArrowFloatingIcon from '../components/Icon/ArrowFloatingIcon';

/**
 * @param {HTMLElement} triggerElement - Phần tử DOM kích hoạt popover.
 * @param {HTMLElement} popoverElement - Phần tử DOM của popover.
 * @param {number} offset - Khoảng cách (px) giữa nút và popover.
 * @param {boolean} hasArrow - Có hiển thị mũi tên chỉ định hướng không.
 * @returns {{top: string, left: string, arrowDirection: string}} - Vị trí của popover và hướng của mũi tên.
 */
function calculatePopoverPosition(
  triggerElement,
  popoverElement,
  offset = 8,
  hasArrow = true
) {
  const triggerRect = triggerElement.getBoundingClientRect();
  const popoverRect = popoverElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top = triggerRect.bottom + offset;
  let left = triggerRect.right - popoverRect.width;
  let arrowDirection = 'up'; // Mặc định mũi tên hướng lên

  // 1. Kiểm tra tràn màn hình bên trái
  if (left < 0) {
    left = triggerRect.left;
  }

  // 2. Kiểm tra tràn màn hình bên phải
  if (left + popoverRect.width > viewportWidth) {
    left = viewportWidth - popoverRect.width;
  }

  // 3. Kiểm tra tràn màn hình ở dưới
  if (
    top + popoverRect.height > viewportHeight &&
    triggerRect.top > popoverRect.height + offset
  ) {
    top = triggerRect.top - popoverRect.height - offset;
    arrowDirection = 'down'; // Chuyển mũi tên hướng xuống
  }

  // Căn chỉnh popover và thêm mũi tên chỉ hướng (nếu có)
  popoverElement.style.top = `${top}px`;
  popoverElement.style.left = `${left}px`;

  if (hasArrow) {
    // Logic thêm mũi tên SVG vào popover
    const arrowSvg = document.createElement(<ArrowFloatingIcon />);
    // ... thêm path SVG cho mũi tên ...
    arrowSvg.style.position = 'absolute';
    if (arrowDirection === 'up') {
      // Định vị mũi tên phía trên popover, căn với nút
      arrowSvg.style.top = `-${offset}px`;
      arrowSvg.style.left = `${
        triggerRect.left + triggerRect.width / 2 - left - 8
      }px`; // Căn giữa với nút
      arrowSvg.style.transform = 'rotate(180deg)';
    } else {
      // Định vị mũi tên phía dưới popover
      arrowSvg.style.bottom = `-${offset}px`;
      arrowSvg.style.left = `${
        triggerRect.left + triggerRect.width / 2 - left - 8
      }px`;
    }
    popoverElement.appendChild(arrowSvg);
  }
}

export default calculatePopoverPosition;
