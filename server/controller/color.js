const Color = require("../model/model");

exports.get = (req, res) => {
  res.json({ msg: "welcome" });
};

exports.post = async (req, res) => {
  const { color_name } = req.body;
  const data = await Color({
    color_name,
  });
  const result = await data.save();
  if (!result) {
    return res.json({ msg: "not save" });
  }
  res.json({ msg: "save" });
};

exports.api = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;

  let skip = (page - 1) * limit;

  const result = await Color.find().skip(skip).limit(limit);
  const count = await Color.find().count();
  res.json({ count: count, data: result });
};
