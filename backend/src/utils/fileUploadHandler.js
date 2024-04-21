"use strict";
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = path.join(__dirname, "../../public/uploads");
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const filter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Formato de archivo no permitido"), false);
  }
};

const uploadFile = multer({ storage, fileFilter: filter });
module.exports =  uploadFile;
