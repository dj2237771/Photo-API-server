const logger = (req, res, next) => {
  console.log(`logeed  @ --- ${new Date()}, ${req.method}`);
  next();
};
module.exports = { logger };
