const fs = require('fs');
const content = fs.readFileSync('src/app/approval-delegations/approval-delegations.component.html', 'utf8');

function showAround(query, len = 200) {
  let idx = 0;
  while ((idx = content.indexOf(query, idx)) !== -1) {
    console.log(`--- Match for "${query}" at index ${idx} ---`);
    console.log(content.substring(Math.max(0, idx - len), Math.min(content.length, idx + len)));
    idx += query.length;
  }
}

console.log("File size:", content.length);
showAround("cM3");
showAround("currentColorM3");
showAround("James Carter");
