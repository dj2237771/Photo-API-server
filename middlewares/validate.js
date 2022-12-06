const validate = (req, res, next) => {
  let search = req.query.search;
  if (!search) {
    next("search term required");
  } else {
    next();
  }
};
module.exports = { validate };
