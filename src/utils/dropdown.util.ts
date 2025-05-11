export const objectToOption = function <T>(
  obj: T,
  idField: keyof T,
  labelField: keyof T
) {
  return { id: obj[idField], label: obj[labelField] };
};
