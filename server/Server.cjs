const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  { email: 'user@example.com', password: bcrypt.hashSync('password123', 10) }
];

// API Route to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
