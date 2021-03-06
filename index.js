var express     = require("express"),
app             = express(),
bodyParser      = require("body-parser"),
methodOverride  = require("method-override"),
mongoose        = require('mongoose');

var PORT = process.env.PORT||8080;
// Connection to DB
mongoose.connect('mongodb://hulio:enmivida1@ds020218.mlab.com:20218/hulio', function(err, res) {
if(err) throw err;
console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models = require('./models/dogs')(app, mongoose);
var modelsUser = require('./models/user')(app, mongoose);
var modelsAdvert = require('./models/adverts')(app, mongoose);

var TVShowCtrl = require('./controllers/dogs');
var LoginUserCtrl = require('./controllers/login');
var ProfileUserCtrl = require('./controllers/profile');
var RegisterUserCtrl = require('./controllers/register');
var AdvertsCtrl = require('./controllers/adverts');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
res.send("Hello world!!!!!");
});
app.use(router);
// API routes

var enAnimals = express.Router();

enAnimals.route('/user/register')
.post(RegisterUserCtrl.createUser);

enAnimals.route('/user/login')
.post(LoginUserCtrl.loginUser);

enAnimals.route('/user/:username')
.get(ProfileUserCtrl.findByName)
.put(ProfileUserCtrl.updateUserCollection);

enAnimals.route('/adverts')
.get(AdvertsCtrl.findAllAdverts);

enAnimals.route('/adverts/:username')
.get(AdvertsCtrl.findByName);

app.use('/api', enAnimals);
app.use(bodyParser.json())
// Start server
app.listen( PORT, function() {
console.log("Node server running on http://localhost:8080");
});
