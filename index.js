const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
app.use(methodOverride('_method')); //to override method for patch and delete requests
//importing uuid module
//const { v4: uuidv4 } = require('uuid'); //destructuring assignment to rename v4 to
uuidv4(); //to generate unique ids for posts

const path = require('path');
//post request body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//views folder setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//public folder setup which contains static files
app.use(express.static(path.join(__dirname, 'public')));


//as we don't have any database connection here, we will just create array which will  store posts 

let posts = [
    {
        id:uuidv4(),
        username: 'john_doe',
        content: 'This is my first post!'
    },

    {      id:uuidv4(),
        username: 'jane_smith',
        content: 'Always a great day to code!'
    },
    {   
           id:uuidv4(),
        username: 'alice_wonder',
        content: 'Loving the new features in JavaScript!'
    },
    {       id:uuidv4(),
        username: 'bob_builder',
        content: 'Just finished a new project!'
    }






];

//routes


app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

//add new post restfull api
app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});
//these will accept new post request
app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username, content});
    console.log(req.body);
    res.redirect('/posts');
    //create new post object    
});



//for single indiviual to find post by id
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);  
    res.render('show.ejs', { post });  

});

//patch request to update post by id
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { content } = req.body; 
    let post = posts.find(p => p.id === id);
    post.content = content;
    res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) => {
let { id } = req.params;

let post = posts.find(p => p.id === id);
res.render('edit.ejs', { post });

});


//delete request to delete post by id
app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
});


//home page
app.get('/', (req, res) => {
    res.redirect('/posts');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
