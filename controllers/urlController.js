import { Url } from "../models/urlModel.js";
import shortid from "shortid";
import { isValidUrl } from "../utils/helpers.js";

export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl, nameUrl, customShortUrl } = req.body;

    if (!originalUrl || !isValidUrl(originalUrl)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL",
      });
    }

    let shortUrl = customShortUrl || shortid.generate();

    if (customShortUrl) {
      const existingUrl = await Url.findOne({ shortUrl: customShortUrl });
      if (existingUrl) {
        return res.status(400).json({
          success: false,
          message: "Custom short URL is already in use",
        });
      }
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const url = await Url.create({
      originalUrl,
      shortUrl,
      user: req.user._id,
      nameUrl: nameUrl || originalUrl,
    });

    res.status(201).json({
      success: true,
      url: {
        ...url.toObject(),
        redirectUrl: `${baseUrl}/${shortUrl}`,
      },
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user._id });
    
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const urlsWithRedirect = urls.map((url) => ({
      ...url.toObject(),
      redirectUrl: `${baseUrl}/${url.shortUrl}`,
    }));

    res.json({
      success: true,
      totalLinksGenerated: urls.length,
      totalClicks: urls.reduce((acc, url) => acc + url.clicks, 0),
      urls: urlsWithRedirect,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const url = await Url.findOne({ shortUrl });

    if (url) {
      url.clicks += 1;
      await url.save();

      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ success: false, message: "URL not found" });
    }
  } catch (error) {
    handleErrors(res, error);
  }
};
