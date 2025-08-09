import React from 'react';
import * as Icons from '@mui/icons-material';

/**
 * Icon wrapper cho Material Icons
 * @param {string} name  - tên icon, viết thường hoặc camelCase ("home", "homeOutlined", "accountCircle")
 * @param {number} size  - kích thước icon (px)
 * @param {string} color - màu icon (CSS color string)
 */
const Icon = ({ name, size = 24, color = 'inherit', ...props }) => {
  // Chuẩn hóa tên icon để match key trong @mui/icons-material
  const formattedName = name
    .split(/-|_/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const IconComponent = Icons[formattedName];

  if (!IconComponent) {
    console.warn(`Icon "${name}" không tồn tại trong @mui/icons-material`);
    return null;
  }

  return <IconComponent style={{ fontSize: size, color }} {...props} />;
};

export default Icon;
