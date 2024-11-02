const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

const uploadsDir = path.join(__dirname, 'uploads');

app.delete('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(uploadsDir, imageName);

  fs.unlink(imagePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при удалении изображения' });
    }
    res.status(200).json({ message: 'Изображение удалено успешно' });
  });
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const { log } = require("console");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/medicine.routes")(app);
require("./app/routes/new.routes")(app);
require("./app/routes/staff.routes")(app);

//авторизация
//1018555832983-6ri35do8kgs9a339gokv15j0qd0jsg5f.apps.googleusercontent.com
//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

//2187484404981665
//1eb27da821d2c098b5028c0948c60547

const User = db.users;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(
  async (username, password, done) => {
      try {
          const user = await User.findOne({ username });
          if (!user) {
              return done(null, false, { message: 'Incorrect username' });
          }
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
              return done(null, false, { message: 'Incorrect password' });
          }
          return done(null, user);
      } catch (error) {
          return done(error);
      }
  }
));

passport.use(new GoogleStrategy({
  clientID: '1018555832983-6ri35do8kgs9a339gokv15j0qd0jsg5f.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
          user = new User({
              username: profile.displayName,
              googleId: profile.id,
          });
          await user.save();
      }
      done(null, user);
  } catch (error) {
      done(error);
  }
}));

passport.use(new FacebookStrategy({
  clientID: '2187484404981665',
  clientSecret: '1eb27da821d2c098b5028c0948c60547',
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ facebookId: profile.id });
      
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const newUser = new User({
          username: profile.displayName,
          facebookId: profile.id,
        });
        
        await newUser.save();
        return done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (error) {
      done(error);
  }
});

app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:8081/login' }),
  async (req, res) => {
      try {
          const { id, displayName, emails } = req.user;
          let user = await User.findOne({ googleId: id });
          if (!user) {
              user = new User({
                  username: displayName || `user_${id}`,
                  googleId: id
              });
              await user.save();
          }

          req.login(user, (err) => {
              if (err) {
                  console.error("Error during login:", err);
                  res.redirect('http://localhost:8081/login');
              }
              res.redirect('http://localhost:8081/medicines');
          });
      } catch (error) {
          console.error("Error during user creation:", error);
          res.redirect('http://localhost:8081/login');
      }
  }
);

app.get('/auth/facebook', passport.authenticate('facebook'));

// Callback маршрут после успешной авторизации
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:8081/login' }),
  (req, res) => {
    // Успешная аутентификация, перенаправление на главную
    res.redirect('http://localhost:8081/medicines');
  }
);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: 'Username already exists' });

  const passwordHash = await bcrypt.hash(password, 8);
  const newUser = new User({ username, passwordHash });
  await newUser.save();

  req.login(newUser, (err) => {
      if (err) {
          return res.status(500).json({ message: 'Login after registration failed' });
      }
      res.json({ message: 'Registration and login successful', user: req.user });
  });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: 'Authentication failed' });

      res.json({ message: 'Authenticated successfully' });
  })(req, res, next);
});

app.post('/logout', (req, res) => {
  req.logout((err) => {
      if (err) {
          return res.status(500).json({ message: 'Server error during logout' });
      }
      res.json({ message: 'Logout successful' });
  });
});

app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
      res.json({ message: "Access granted", user: req.user });
  } else {
      res.status(401).json({ message: "Unauthorized" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});