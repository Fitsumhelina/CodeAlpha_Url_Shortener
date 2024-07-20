const Url = require('../models/Url');
const shortid = require('shortid');
const dotenv = require('dotenv');

dotenv.config();

const createShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!longUrl) {
    return res.status(400).json('Invalid URL');
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      const urlCode = shortid.generate();
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      });

      await url.save();

      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};

const redirectToLongUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};

module.exports = {
  createShortUrl,
  redirectToLongUrl
};
