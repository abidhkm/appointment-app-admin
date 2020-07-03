export const formatDate = _date => {
    const date = new Date(_date);
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
  };