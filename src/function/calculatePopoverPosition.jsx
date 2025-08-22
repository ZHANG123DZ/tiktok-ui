// calculatePopoverPosition.js (Corrected)
// This function should only calculate the position, not manipulate the DOM directly.

/**
 * @param {HTMLElement} triggerElement - The DOM element that triggers the popover.
 * @param {HTMLElement} popoverElement - The DOM element of the popover.
 * @param {number} offset - The spacing (in pixels) between the trigger and the popover.
 * @returns {{top: number, left: number, arrowDirection: string}} - The calculated position and arrow direction.
 */
function calculatePopoverPosition(triggerElement, popoverElement, offset = 8) {
  if (!triggerElement || !popoverElement) {
    return { top: 0, left: 0, arrowLeft: 10, arrowDirection: 'up' };
  }

  const triggerRect = triggerElement.getBoundingClientRect();
  const popoverRect = popoverElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top = triggerRect.bottom + offset;
  let left = triggerRect.left;
  let arrowDirection = 'up';

  // Nếu popover bị tràn phải → dịch sang trái 10px so với viewport
  if (left + popoverRect.width > viewportWidth) {
    left = viewportWidth - popoverRect.width;
  }
  // Nếu popover bị tràn trái → đặt sát trái
  if (left < 10) {
    left = 10;
  }

  // Nếu tràn xuống dưới → hiển thị phía trên
  if (
    top + popoverRect.height > viewportHeight &&
    triggerRect.top > popoverRect.height + offset
  ) {
    top = triggerRect.top - popoverRect.height - offset;
    arrowDirection = 'down';
  }

  // Tính arrowLeft dựa trên vị trí dự kiến của popover
  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  let arrowLeft = triggerCenterX - left - 5;

  // Giới hạn arrow trong popover (để không tràn)
  if (arrowLeft < 10) arrowLeft = 10;
  if (arrowLeft > popoverRect.width - 10) {
    arrowLeft = popoverRect.width - 30;
  }

  return { top, left, arrowLeft, arrowDirection };
}

export default calculatePopoverPosition;
