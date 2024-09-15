var { execSync } = require('child_process');

function mayAddZero(number) {
  if (number < 10) return `0${number}`;
  return number;
}

var date = new Date();
var day = date.getDate();
var month = mayAddZero(date.getMonth() + 1);
var year = mayAddZero(date.getFullYear());
date = `${year}-${month}-${day}`;

var command = `npm run format && git add . && git commit -m "english ${date}" && git push`;

execSync(command);
