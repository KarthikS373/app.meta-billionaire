const protectAPI = (handler) => {
  return async (req, res) => {
    try {
      if (new URL(req.headers.referer).origin !== process.env.WEBSITE_URL) {
        return res
          .status(403)
          .json({ success: false, message: `Forbidden Access` });
      }
      return handler(req, res);
    } catch {
      return res
        .status(403)
        .json({ success: false, message: `Forbidden Access` });
    }
  };
};

export default protectAPI;
