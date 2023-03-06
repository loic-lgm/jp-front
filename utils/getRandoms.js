export default function getRandomIds(datas, n) {

  let ids = []
  datas.map(data => {
    ids.push(data.id);
  });
  const shuffledArray = ids.sort(() => 0.5 - Math.random());
  const result = shuffledArray.slice(0, n);

  return result;
}