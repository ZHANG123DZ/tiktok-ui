export default function getDaysInMonth(month, year) {
  const monthIndex = month - 1;

  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error('Tháng không hợp lệ (phải từ 1 đến 12)');
  }

  return new Date(year, month, 0).getDate();
}
