export const formatTeacherInitials = (
  firstName: string,
  lastName: string,
  middleName: string | null,
) => {
  const firstInitial = lastName[0].toUpperCase();
  if (middleName && middleName.length > 0) {
    const middleInitial = middleName[0].toUpperCase();
    return `${firstName} ${firstInitial}. ${middleInitial}.`;
  }
  return `${firstName} ${firstInitial}.`;
};
