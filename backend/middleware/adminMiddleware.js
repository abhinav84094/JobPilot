// Gates admin-only routes. Must run AFTER authMiddleware (needs req.user).
//
// Admin emails come from the ADMIN_EMAILS env var — a comma-separated
// list, e.g. ADMIN_EMAILS=you@gmail.com,teammate@gmail.com
const adminMiddleware = (req, res, next) => {
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!req.user || !adminEmails.includes(req.user.email.toLowerCase())) {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  next();
};

export default adminMiddleware;
