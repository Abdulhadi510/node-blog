const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://ahadi:test123@node.pulsgby.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000) )
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

//mongoos and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog 2',
//         snippet: 'Here is my new blog 2',
//         body: 'more about my new blog 2'
//     });

//     blog.save()
//        .then((result) => {
//          res.send(result)
//        })
//        .catch((err) => {
//          console.log(err);
//        });
//   });

// app.get('/all-blogs', (req, res) =>{
//     Blog.find()
//     .then((result) => {
//         res.send(result)
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// });

// app.get('/single-blog', (req, res) =>{
//     Blog.findById('655748a3e67f443909725bf6')
//     .then((result) => {
//         res.send(result)
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// });

//Middleware
// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host: ' , req.hostname);
//     console.log('path: ' , req.path);
//     console.log('method: ' , req.method);
//     next();
// });

//routes
app.get('/', (req, res) =>{
    //res.send('<p>Home Page</p>');
    //res.sendFile('./views/index.html', { root: __dirname });
    // const blogs = [
    //     {title : 'Babar Azam Steps out as captain', snippet : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    //     {title : 'Muhammad Amir selected as captain', snippet : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    //     {title : 'Box office collection of tiger3 is 300 crores', snippet : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// });

app.get('/about', (req, res) =>{
    //res.send('<p>About Page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//redirects
// app.get('/about-us', (req, res) =>{
//     res.redirect('/about');
// });

//404 page
app.use((req, res) =>{
    res.status(404).render('404', { title: '404' });
});