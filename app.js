const express = require('express');
const app = express();
const path = require('path');
const userController = require('./controllers/userController');

const port = 3000;

// Set EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (e.g., CSS, images)
app.use(express.static('public'));

// Route to render the HTML view
// app.get('/', userController.renderProducts);
app.get('/', userController.renderIndex);
app.get('/products/:id', userController.renderProductById);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
