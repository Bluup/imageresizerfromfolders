const fs = require("fs");
const path = require("path");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

function resizeImages(folderPath, acceptedExtensions) {
  //Methods
  const logMessage = (message, content) => {
    console.log(message);
    content && console.log(content);
  };

  const logInitialMessage = () => {
    logMessage("Initializing");
    logMessage("Reading folder structure, this might take a while...");
  };

  const logError = (err) => {
    logMessage("Error: ");
    throw err;
  };

  const checkForSlash = () => {
    const lastChar = folderPath.substr(-1);
    if (lastChar !== "/") folderPath = `${folderPath}/`;
  };

  const isFile = (folderPath, fileName) => {
    return fs.lstatSync(`${folderPath}${fileName}`).isFile();
  };

  const isAnImage = (filename) => {
    const extension = path.extname(filename).toLowerCase();
    if (acceptedExtensions.includes(extension)) return true;
    return false;
  };

  const getPath = (image) => {
    return path.dirname(image);
  };

  const optimize = async (images) => {
    logMessage(`A total of ${images.length} images are going to be processed`);
    logMessage("Optimizing...");
    await images.map(async (image) => {
      const path = getPath(image);
      try {
        await imagemin([image], {
          destination: path,
          plugins: [
            imageminJpegtran(),
            imageminPngquant({
              quality: [0.6, 0.8],
            }),
          ],
        });
      } catch (err) {
        logError(err);
      }
    });
  };

  //Response
  const folderArray = [];

  //Default Parameters
  if (!acceptedExtensions) acceptedExtensions = [".jpg", ".png"];
  // if (!destination) destination = "/optimization/";

  // Check Parameters
  if (!folderPath) {
    logError("The folder path is not defined");
  }

  checkForSlash();
  logInitialMessage();

  const readFiles = (folderPath) =>
    new Promise((res, rej) => {
      try {
        const files = fs.readdirSync(folderPath);
        files.map((file) => {
          if (isFile(folderPath, file)) {
            isAnImage(file) && folderArray.push(`${folderPath}${file}`);
          } else {
            const newFolderPath = `${folderPath}${file}/`;
            readFiles(newFolderPath);
          }
        });
        res(folderArray);
      } catch (err) {
        rej(err);
      }
    });

  //Main Function Initialization
  readFiles(folderPath).then((res, rej) => {
    if (res) {
      optimize(res);
    } else {
      logError(rej);
    }
  });
}

module.exports = (folderPath, acceptedExtensions) => [resizeImages(folderPath, acceptedExtensions)];
