/*
Exercise: install and import the Cloudinary Node.js SDK (using the import syntax) and call the upload function to upload files that are sent to this serverless function. Also make sure to specify the right upload preset as a paramter to the upload.

Note that for importing the Cloudinary SDK you'll need to use an alias (alias Cloudinary to v2). (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#syntax)

Please also install and import the formidable package.
*/

// import the Cloudinary Node.js SDK here.
// import formidable here.
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};
cloudinary.config(true);

const promisifyFormParser = (req) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
      } else {
        resolve({ files });
      }
    });
  });
};

const postHandler = async (req, res) => {
  const { files } = await promisifyFormParser(req);
  const response = await uploadToCloudinary(files.file);
  return res.status(201).send(response);
};

const uploadToCloudinary = async (file) => {
  try {
    /* Call the upload here. Note that the upload() method is available on an object called uploader which in turn is available on the cloudinary object imported earlier.
    
    Please also remember that the upload() method returns a promise and we are in an async function so use the appropriate keyword.

    Finally please don't forget to add the upload preset as an option.

    Things to note: the actual file is available via `file.filepath` and you should store the result of the upload in a variable called `results`, i.e.:

    const results = ...
    */

    await fs.unlinkSync(file.filepath);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return postHandler(req, res);
  }
}
