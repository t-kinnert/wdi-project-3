const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost/animal';
const secret = process.env.SECRET || 'critters';

module.exports = {
  port, dbUri, secret
};
