export const sortByDate = (data, setData) => {
  const newArr = data.sort((a, b) => b.timeSpent - a.timeSpent);
  setData([...newArr])
  return newArr
}

export const sortByName = (data, setData) => {
  const newArr = data.sort((a, b) => a.user.username.localeCompare(b.user.username));
  setData([...newArr])
  return newArr
}

export const handlePageClick = (event, data, setItemOffset) => {
  const newOffset = (event.selected * 6) % data.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};