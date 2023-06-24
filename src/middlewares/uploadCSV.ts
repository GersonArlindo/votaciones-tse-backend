export const convert = function (csvFile: any) {
  const convert = (from: any, to: any) => (str: any) => Buffer.from(str, from).toString(to);

  const hexToUtf8 = convert('hex', 'utf8');

  let csvData = hexToUtf8(csvFile.data).split('\r\n');
  let csvRows: any = [];

  csvData.forEach((data) => {
    csvRows.push(data.split(','));
  });

  let data = [];

  for (let i = 1; i < csvRows.length; ++i) {
    let dict: any = {};
    for (let j = 0; j < csvRows[i].length; ++j) {
      dict[csvRows[0][j]] = csvRows[i][j];
    }
    data.push(dict);
  }
  return data;
}