const Article = require("../models/article");

// Get Article Middlware
async function getArticle(req, res, next) {
  try {
    const slug = req.params.slug;
    const article = await Article.findOne({ slug });

    if (!article)
      return res.status(404).json({ message: "Article Not Found!" });

    req.article = article;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Pagination Middlware
function paginate(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endEndex = page * limit;

    const results = {};

    if (endEndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.result = await model
        .find({})
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.results = results;

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = {
  getArticle,
  paginate,
};
