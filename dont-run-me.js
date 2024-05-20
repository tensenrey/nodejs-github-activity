const fs = require("fs").promises;
const { exec } = require("child_process");

const file = "./are_u_sure.txt";

let index =  Math.round(Math.random() * 1_000);

const commitMe = async () => {
  const data = await fs.readFile(file, "utf8");
  const _ = Number(data) + 1;

  await fs.writeFile(file, String(_));

  exec(`git add . && git commit -m"upd${_}"`);

  return _;
}

async function main() {
  const data = await commitMe();

  if (data && index !== 0) {
    await main();
    return index--;
  }

  return exec("git push");
}
  
main();
