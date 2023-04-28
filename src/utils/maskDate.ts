function incrementLeftZero(value: number) {
  if (value <= 9) {
    return `0${value}`;
  }
  return value;
}

function maskDate(value: Date): string {
  const date = new Date(value);

  const formatDate = `${incrementLeftZero(date.getDate())}/${incrementLeftZero(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;

  return formatDate;
}

export default maskDate;
