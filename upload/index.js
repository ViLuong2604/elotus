const express = require("express");
const app = express();
const multer = require("multer");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Images = require("./ImgModel");

app.set("view engine", "ejs");
app.set("views", "./view");
app.use(express.json());
dotenv.config();

// connect database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfully!"))
  .catch((err) => {
    console.log(err);
  });

// configure file storage path
var storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./tmp");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// validation before upload
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 8388608,
  },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//Uploading multiple files
app.post("/upload", upload.single("file"), (req, res) => {
  if (req.body.auth === process.env.AUTH) {
    if (req.file === undefined) {
      return res.status(403).json({ err: "File not be empty!" });
    }
    const img = new Images(req.file);
    img
      .save(img)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(403).json(err));
  } else {
    return res.status(403).json({ err: "Wrong password" });
  }
});

app.listen(3000, () => console.log("Connect Successfully!"));

app.get("/", (_req, res) => {
  res.render("form");
});
