// const cors = require('cors');
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose'); // Mongoose for MongoDB
// const MemberModel = require('../models/users');

// // MongoDB connection
// const mongoURI = 'mongodb://127.0.0.1:27017/prayercell';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 10000,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1);
//   });

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Serve the HTML file
// app.get('/', (req, res) => {
//   const filePath = path.join(__dirname, 'views', 'index.html');
//   res.sendFile(filePath);
// });

// app.get('/search', async (req, res) => {
//   const searchField = req.query.name || '';

//   try {
//     const data = await MemberModel.find({ NAME: { $regex: new RegExp(searchField, 'i') } });
//     console.log('Search Result:', data);
//     res.json(data);
//   } catch (err) {
//     console.error('Error searching in the database:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.post('/add-member', async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { name, city, education, year, age } = req.body;

//     // Create a new MemberModel instance
//     const newMember = new MemberModel({
//       NAME: name,
//       CITY: city,
//       EDUCATION: education,
//       YEAR:year,
//       AGE:age, 
//     });

//     // saving
//     const savedMember = await newMember.save();

//     console.log('New member added:', savedMember);
//     res.json({ success: true, message: 'Member added successfully', data: savedMember });
//   } catch (err) {
//     console.error('Error adding member to the database:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
const cors = require('cors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/logs'); 
const MemberModel = require('../models/users');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection for user authentication,peopledata
const mongoURI = 'mongodb://127.0.0.1:27017/userAuthDB';
const prayercellDBURI = 'mongodb://127.0.0.1:27017/prayercell';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Now connect to the second database
    return mongoose.createConnection(prayercellDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
  })
  .then(() => {
    console.log('Connected to prayercellDB');
  });
    // Serve the HTML file
    app.get('/', (req, res) => {
      const filePath = path.join(__dirname, 'views', 'auth.html');
      res.sendFile(filePath);
    });
// Serve the signup page
app.get('/signup', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'signup.html');
  res.sendFile(filePath);
});

// Serve the login page
app.get('/login', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'login.html');
  res.sendFile(filePath);
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    // Save the user to the userAuthDB database
    const savedUser = await newUser.save();

    res.json({ success: true, message: 'Signup successful', user: savedUser });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the userAuthDB database
    const user = await UserModel.findOne({ username });

    // Check if the user exists and the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      // If successful, redirect to the dashboard page
      res.json({ success: true, message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/index', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);
  });
app.get('/search', async (req, res) => {
  const searchField = req.query.name || '';

  try {
    const data = await MemberModel.find({ NAME: { $regex: new RegExp(searchField, 'i') } });
    console.log('Search Result:', data);
    res.json(data);
  } catch (err) {
    console.error('Error searching in the database:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/add-member', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, city, education, year, age } = req.body;

    // Create a new MemberModel instance
    const newMember = new MemberModel({
      NAME: name,
      CITY: city,
      EDUCATION: education,
      YEAR:year,
      AGE:age, 
    });

    // saving
    const savedMember = await newMember.save();

    console.log('New member added:', savedMember);
    res.json({ success: true, message: 'Member added successfully', data: savedMember });
  } catch (err) {
    console.error('Error adding member to the database:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
