const generateResourceList = () => {
  const list = [];
  for (let i = 0; i < 15; i++) {
    list.push({
      key: `${i}`,
      name: `resource${i}`,
    });
  }
  return list;
};

export default generateResourceList;
