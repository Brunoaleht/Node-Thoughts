const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static async loginUser(req, res) {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "User não encontrado");
      res.render("auth/login");
      return;
    }

    //checked password match
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash("message", "Senha incorreta");
      res.render("auth/login");
      return;
    }

    //start session
    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect("/");
    });
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async registerUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    //password match validation
    if (password != confirmPassword) {
      req.flash("message", "As senhas não confere, tente novamente");
      res.render("auth/register");
      return;
    }

    //Checked Email if user exist
    const checkedUserExistis = await User.findOne({ where: { email: email } });
    if (checkedUserExistis) {
      req.flash("message", "E-mail já cadastrado");
      res.render("auth/register");
      return;
    }

    //create password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createUser = await User.create(user);
      //start session
      req.session.userId = createUser.id;
      req.flash("message", "Usuário Cadastrado com Sucesso");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
