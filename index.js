const { readdir, readFile } = require("fs").promises;
const espressioneDiMatch =
  '<parameter name="_VERSIONE" class="java.lang.String"></parameter>';
async function startTest() {
  const promiseArray = [];
  try {
    const files = await readdir("./");
    let jasper = 0;
    for (const file of files) {
      if (file.endsWith(".jrxml")) {
        jasper++;
        promiseArray.push(
          new Promise(async (resolve, reject) => {
            try {
              const data = await readFile(`./${file}`, "utf-8");
              if (!data.includes(espressioneDiMatch))
                reject(`Mancato Versionamento in ${file}`);
              resolve();
            } catch (error) {
              reject(error);
            }
          })
        );
      }
    }
    console.debug(`Trovati ${jasper} jasper`);
  } catch (error) {
    throw error;
  }

  return Promise.all(promiseArray);
}

startTest()
  .then(() => {
    console.info("tutti i file sono versionati!!");
  })
  .catch((e) => {
    console.error(e);
    throw e.message;
  });
