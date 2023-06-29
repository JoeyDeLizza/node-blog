// app.js
// Setup
const uri = //mongodb uri;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(uri);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/assets'));
var postSchema = new mongoose.Schema({ title: String, body: String });
var Post = mongoose.model('Post', postSchema);
var ps = new mongoose.Schema({ key: String});
var key = mongoose.model('key', ps);
var pass = new key({key: 'bananasplit'});
pass.save();
// Routes
app.get("/", async (req, res) => {
    //const posts = await Post.find({});
    //console.log(posts);
      res.render('index')

});
app.post('/Posts/addpost', async (req, res) => {
    const check = await key.findOne({key: req.body.key});
    console.log("Checking: ");
    if(check == null) {
	console.log("incorrect key");
	//res.redirect('/');
    } else {
	var postData = new Post({title: req.body.title, body: req.body.body});
    postData.save().then( result => {
        res.redirect('/Posts');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
    }
});

app.get("/Posts", async (req, res) => {
    const posts = await Post.find({});
    console.log(posts);
    res.render('posts', {posts})

});


app.get("/Posts/:id", async (req, res) => {
    console.log(req.params.id);
    const post = await Post.findOne({title: req.params.id}).lean();
    console.log(post);
    console.log(post.title);
    res.render('post', {post});
});

app.get("/About", async (req, res) => {
    res.render('about')
});


app.get("/Projects", async (req, res) => {
    res.render('projects')
});
// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})
