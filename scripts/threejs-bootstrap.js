const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
//joining path of directory
const rootPath = path.join(__dirname, "../");
console.log("rootPath: ", rootPath);
let blueprintDirCount = 0;

fs.readdir(rootPath, function(err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function(file) {
    const isDir = fs.lstatSync(`${rootPath}${file}`).isDirectory();
    const bluePrintDir = file.includes("blueprint");

    if (isDir && bluePrintDir) {
      const dirNum = Number(file[file.length - 1]);
      blueprintDirCount =
        dirNum > blueprintDirCount ? dirNum : blueprintDirCount;
    }
  });
  createBluePrintDir();
});

const createBluePrintDir = () => {
  //move contents of "tmp" folder into root of project
  const destination = `${rootPath}blueprint${++blueprintDirCount}`;
  const source = path.join(__dirname, "tmp");

  ncp(source, destination, err => {
    if (err) return console.error(err);
    console.log(`done!: `);
  });
};
