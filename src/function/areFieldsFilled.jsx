import { isObject } from 'lodash-es'; // hoặc tự viết check object nếu không dùng lodash

export function areFieldsFilled(fieldsObj) {
  // Trường hợp không có gì trong object
  if (!isObject(fieldsObj) || Object.keys(fieldsObj).length === 0) return false;

  return Object.values(fieldsObj).every(
    (value) =>
      value !== undefined &&
      value !== null &&
      !(typeof value === 'string' && value.trim() === '') &&
      !(Array.isArray(value) && value.length === 0)
  );
}
