var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//mongoose.connect('')
//mongoose.connect("mongodb://localhost/to-do");

// V - defined enviromental variable DATABASEURL - on HEROKU settings -> Config Vars
var url =  "mongodb://localhost/learning-plan";
mongoose.connect(url);
//mongoose.connect("mongodb://lang:_____@ds011775.mlab.com:11775/to-do" || "mongodb://localhost/to-do");

// V - Express middlewear - express.static(root, [options]) - http://expressjs.com/en/api.html#express.static
app.use(express.static(__dirname+'/public'));
// V - morgan(format, options) - https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

// V - https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({'extended':'true'}));
// V - bodyParser.json(options)
app.use(bodyParser.json());
// V - http://jsonapi.org/format/
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

//-----------TO learn-----------
//Define mongoose schema - 
var learningSchema = new mongoose.Schema({ text: 'string' });

//Model
var Tolearn = mongoose.model('Tolearn', learningSchema);

// V - old code no defined schema
// var tolearn = mongoose.model('tolearn', {
//     text: String
// });

//get all tolearns
// V - Express application method - app.get(path, callback [, callback ...]) -http://expressjs.com/en/api.html#app.get
app.get('/api/tolearn', function(req, res){
    // V- mongoose - Model.find(conditions, [projection], [options], [callback]) http://mongoosejs.com/docs/api.html#model_Model.find
    Tolearn.find(function(err, tolearn){
        // V - javascript error handling
        if (err){
            // V - express responce method - res.send([body])
            res.send(err);
        }
        // V - express responce method - res.json([body])
        res.json(tolearn);
    });
});
//create a to-learn and send it back
app.post('/api/tolearn', function(req, res){
    Tolearn.create({
        text: req.body.text,
        done: false
    }, function(err, tolearn){
        if (err){
            res.send(err);
        } 
        Tolearn.find(function(err, tolearn){
            if (err){
                res.send(err);
            }
            res.json(tolearn);
        });
    });
});

//Delete a To-learn
app.delete('/api/tolearn/:tolearn_id', function(req, res){
    Tolearn.remove({
        _id : req.params.tolearn_id
    }, function(err, tolearn){
        if(err){
            res.send(err);
        }
        Tolearn.find(function(err, tolearn){
            if (err){
                res.send(err);
            }
            res.json(tolearn);
        });
    });
});

//-----------PROJECTS-----------
// var projectSchema = new mongoose.Schema({ text: 'string' });
//Define mongoose schema - 
var projectSchema = new mongoose.Schema({ 
    projectName: String,
    discription: String,
    link: String
});

//Model
var Projects = mongoose.model('Projects', projectSchema);

app.get('/api/projects', function(req, res){
    // V- mongoose - Model.find(conditions, [projection], [options], [callback]) http://mongoosejs.com/docs/api.html#model_Model.find
    Projects.find(function(err, projects){
        // V - javascript error handling
        if (err){
            // V - express responce method - res.send([body])
            res.send(err);
        }
        // V - express responce method - res.json([body])
        res.json(projects);
    });
});
//create a to-learn and send it back
app.post('/api/projects', function(req, res){
    Projects.create({
        projectName: req.body.projectName,
        discription: req.body.discription,
        link: req.body.link,
        done: false
    }, function(err, project){
        if (err){
            res.send(err);
        } 
        Projects.find(function(err, project){
            if (err){
                res.send(err);
            }
            res.json(project);
        });
    });
});

//Delete a To-learn
app.delete('/api/projects/:project_id', function(req, res){
    Projects.remove({
        _id : req.params.project_id
    }, function(err, project){
        if(err){
            res.send(err);
        }
        Projects.find(function(err, project){
            if (err){
                res.send(err);
            }
            res.json(project);
        });
    });
});


//--------------SENDING THE MAIN INDEX PAGE--------------

//Angular application send!
app.get('*', function(req, res){
    // V - express responce method - res.sendFile(path [, options] [, fn])
    res.sendfile('.public/index.html');
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the To-Learn server...');
});
