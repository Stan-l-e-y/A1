require('dotenv').config({ path: '.env' });

module.exports = {
  url: process.env.MONGODB_URI,
};
