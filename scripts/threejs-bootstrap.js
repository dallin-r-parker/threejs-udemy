const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;
//TODO: can remove this dependency by writing script that read ".git/HEAD" and parses out the branch ref
const branchName = require("current-git-branch");

const rootPath = path.join(__dirname, "../");
const bluePrintDirBase = "blueprint";
let blueprintDirCount = 0;

if (branchName.includes(bluePrintDirBase)) {
  fs.readdir(rootPath, (err, files) => {
    //handling error
    if (err) return console.error(`issue scanning directory: ${err}`);

    //listing all files using forEach
    files.forEach(function(file) {
      const isDir = fs.lstatSync(`${rootPath}${file}`).isDirectory();
      const bluePrintDir = file.includes(bluePrintDirBase);

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
    const destination = `${rootPath}${bluePrintDirBase}${++blueprintDirCount}`;
    const source = path.join(__dirname, "tmp");

    ncp(source, destination, err => {
      if (err) return console.error(err);
      console.log(`done!: `);
    });
  };
}
