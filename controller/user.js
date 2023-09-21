const model = require("../model/user");
const User = model.User;
const ejs = require("ejs");
const path = require("path");
var jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, "shhhhh");
  user.token = token;
  const userADD = await user.save();

  res.json(userADD);
};
exports.readSSR = async (req, res) => {
  const users = await User.find();
  ejs.renderFile(
    path.resolve(__dirname, "../pages/index.ejs"),
    { users: users },
    function (err, str) {
      // str => Rendered HTML string
      res.send(str);
    }
  );
};
exports.read = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
exports.readById = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ id: id });
  res.json(user);
};

exports.replace = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndReplace({ id: id }, req.body, {
    new: true,
  });
  res.json(user);
};
exports.update = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndUpdate({ id: id }, req.body, { new: true });
  res.status(201).json(user);
};
exports.Delete = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndDelete({ id: id });
  res.status(201).json(user);
};
