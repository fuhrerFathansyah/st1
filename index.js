const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const methodOverride = require("method-override");
const Handlebars = require("handlebars");
const config = require("./config/config.json"); // Perbaiki pemanggilan config
const { Sequelize, QueryTypes } = require("sequelize");
const { title } = require("process");
const sequelize = new Sequelize(config.development);
const modelblog = require("./models").blog;
const user = require("./models").user;
const bcrypt = require("bcrypt");
const session = require('express-session');
const flash = require('express-flash');


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

require('dotenv').config();

app.use(
  session({
    name: "mysession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);

console.log("Nilai rahasia sesi:", process.env.SESSION_SECRET);

app.use(flash());

// Middleware untuk memeriksa apakah pengguna telah login
function isAuthenticated(req, res, next) {
  // Periksa apakah ada sesi isLogin
  if (req.session && req.session.isLogin) {
    // Jika pengguna telah login, lanjutkan ke halaman berikutnya
    return next();
  }
  // Jika pengguna tidak login, arahkan mereka ke halaman login
  res.redirect('/login');
}

function isNotAuthenticated(req, res, next) {
  // Periksa apakah tidak ada sesi isLogin
  if (!req.session || !req.session.isLogin) {
    // Jika pengguna belum login, lanjutkan ke halaman berikutnya
    return next();
  }
  // Jika pengguna sudah login, arahkan mereka ke halaman utama atau halaman lain yang sesuai
  res.redirect('/');
}


// Routes
app.get("/", home);
app.get("/blog", blog);
app.post("/blog", isAuthenticated,addBlog);
app.post("/blog/:id", isAuthenticated, editBlog);
app.delete("/blog/:id", isAuthenticated, deleteBlog);
app.get("/add-blog", isAuthenticated,addBlogView);
app.get("/edit-blog/:id", isAuthenticated, editBlogView);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/blog-detail/:id", blogDetail);

app.get("/login", isNotAuthenticated, loginView);
app.get("/register", isNotAuthenticated, registerView);

app.post("/login", isNotAuthenticated, login);
app.post("/register", isNotAuthenticated, register);
app.post("/logout", logout);





function loginView(req, res) {
  res.render("login");
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const foundUser = await user.findOne({
      where: { username },
    });

    if (!foundUser) {
      req.flash("danger", "Username or Password is wrong!");
      return res.redirect("/login");
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      req.flash("danger", "Username or Password is wrong!");
      return res.redirect("/login");
    }

    req.session.isLogin = true;
    req.session.user = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };

    req.flash("success", "Login berhasil!");
    return res.redirect("/");
  } catch (error) {
    console.error("Error occurred:", error);
    req.flash("danger", "An error occurred while processing your request. Please try again later.");
    return res.redirect("/login");
  }
}


function registerView(req, res) {
  res.render("register");
} 

async function register(req, res) {
  const { username, email, password } = req.body;

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  await user.create({ 
    username,
    email,
    password: hashedPassword,
  });

  //   const query = `
//   INSERT INTO users (username, email, password, "createdAt", "updatedAt")
//   VALUES (?, ?, ?, ?, ?)
// `;

// await sequelize.query(query, {
//   replacements: [username, email, hashedPassword, new Date(), new Date()],
//   type: QueryTypes.INSERT
// });

  res.redirect("/");
}

async function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) return console.error("Logout failed!");

    res.redirect("/login");
  });
}

async function home(req, res) {
  res.render("index");
}

async function blog(req, res) {
  // const query = "SELECT * FROM blogs";
  // const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  const data = await modelblog.findAll();

  res.render("blog", { isLogin, user, data });
}

async function addBlog(req, res) {
  const {
    title,
    content,
    startDate,
    endDate,
    nodejs,
    reactjs,
    nextjs,
    typescript,
  } = req.body;

  const nodeJsValue = nodejs === "true";
  const reactJsValue = reactjs === "true";
  const nextJsValue = nextjs === "true";
  const typescriptValue = typescript === "true";

  const query = `INSERT INTO blogs(title,content,image,"createdAt","updatedAt","Node_JS", "React_JS", "Next_JS", "Typescript") 
  VALUES('${title}','${content}','https://static.icy-veins.com/images/genshin-impact/characters/arlecchino.webp', '${startDate}', TO_DATE('${endDate}','YYYY-MM-DD'),${nodeJsValue}, ${reactJsValue}, ${nextJsValue}, ${typescriptValue})`;

   const data = await sequelize.query(query, { type: QueryTypes.INSERT });

  // const data = await modelblog.create({
  //   title,
  //   content,
  //   image:
  //     "https://static.icy-veins.com/images/genshin-impact/characters/arlecchino.webp",
  //   createdAt: startDate,
  //   updatedAt: endDate, 
  //   Node_JS: nodeJsValue,
  //   React_JS: reactJsValue,
  //   Next_JS: nextJsValue,
  //   Typescript: typescriptValue,
  // })

 
  res.redirect("blog");
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  try {
    // const query = `DELETE FROM blogs WHERE id = ${id}`;
    // const data = await sequelize.query(query, { type: QueryTypes.DELETE });

    const data = await modelblog.destroy({
      where: { id },
    });

    // Send a success response to the client
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    // Send an error response to the client if deletion fails 
    res.status(500).json({ error: "Failed to delete blog post" });
  }
}

async function editBlog(req, res) {
  const {
    title,
    content,
    startDate,
    endDate,
    nodejs,
    reactjs,
    nextjs,
    typescript,
    id,
  } = req.body;

  const nodeJsValue = nodejs === "true";
  const reactJsValue = reactjs === "true";
  const nextJsValue = nextjs === "true";
  const typescriptValue = typescript === "true";

  const query = `UPDATE blogs 
          SET title='${title}', 
          content='${content}', 
          image=
                'https://static.icy-veins.com/images/genshin-impact/characters/arlecchino.webp', 
          "createdAt"=TO_DATE('${startDate}','YYYY-MM-DD'), 
          "updatedAt"=TO_DATE('${endDate}','YYYY-MM-DD'),
          "Node_JS"=${nodeJsValue}, 
          "React_JS"=${reactJsValue}, 
          "Next_JS"=${nextJsValue}, 
          "Typescript"=${typescriptValue} 
          WHERE id=${id}`;

  const data = await sequelize.query(query, { type: QueryTypes.UPDATE })

  // const data = await modelblog.update(
  //   {
  //     title,
  //     content,
  //     image: 'https://static.icy-veins.com/images/genshin-impact/characters/arlecchino.webp',
  //     createdAt: startDate, // Assuming startDate is in a valid date format
  //     updatedAt: endDate, // Assuming endDate is in a valid date format
  //     Node_JS: nodeJsValue,
  //     React_JS: reactJsValue,
  //     Next_JS: nextJsValue,
  //     Typescript: typescriptValue
  //   },
  //   {
  //     where: { id },
  //   }
  // );
    
    res.redirect("/blog");

}


function addBlogView(req, res) {
  res.render("add-blog", {
  });
}

async function editBlogView(req, res) {
  const { id } = req.params;

  const data = await modelblog.findOne({
    where: { id },
  });

  res.render("edit-blog", { data });
}

function contact(req, res) {
  res.render("contact");
}

function testimonial(req, res) {
  res.render("testimonial");
}

async function blogDetail(req, res) {
  const { id } = req.params;

  // const query = `SELECT * FROM blogs WHERE id = ${id}`;
  // const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  const data = await modelblog.findOne({
    where: { id },
  });

  if (data) {
    res.render("blog-detail", { data });
  } else {
    res.status(404).send("Blog not found");
  }
}

app.listen(port, () => {
  console.log("Server is running on PORT :", port);
});
