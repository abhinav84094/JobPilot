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

// pdf-parse is the only parser wired up right now, so only PDF can
// actually be processed end-to-end. .doc/.docx are rejected here
// (rather than accepted and then crashing later in pdf-parse) until
// a Word-doc parser (e.g. mammoth) is added.
const ALLOWED_MIME_TYPES = [
    "application/pdf",
];

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(null, true);
    }

    // Rejecting here (rather than throwing) lets the route handler
    // respond with a clean 400 instead of a generic 500 crash.
    cb(new Error("INVALID_FILE_TYPE"));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB, matches what the UI already advertises
    },
});

export default upload;