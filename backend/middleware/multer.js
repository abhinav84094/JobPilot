import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const now = new Date();

        const formattedDate =
            `${now.getFullYear()}-` +
            `${String(now.getMonth() + 1).padStart(2, "0")}-` +
            `${String(now.getDate()).padStart(2, "0")}_` +
            `${String(now.getHours()).padStart(2, "0")}-` +
            `${String(now.getMinutes()).padStart(2, "0")}-` +
            `${String(now.getSeconds()).padStart(2, "0")}`;

        cb(null, `${formattedDate}-${file.originalname}`);
    }
});

const upload = multer({
    storage
});

export default upload;