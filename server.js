var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//mongoose.connect('')
//mongoose.connect("mongodb://localhost/to-do");

// V - defined enviromental variable DATABASEURL - on HEROKU settings -> Config Vars
var url = process.env.DATABASEURL || "mongodb://localhost/to-do";
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

//-----------TO DO-----------
//Define mongoose schema - 
var schema = new mongoose.Schema({ text: 'string' });

//Model
var Todo = mongoose.model('Todo', schema);

// V - old code no defined schema
// var Todo = mongoose.model('Todo', {
//     text: String
// });

//get all todos
// V - Express application method - app.get(path, callback [, callback ...]) -http://expressjs.com/en/api.html#app.get
app.get('/api/todos', function(req, res){
    // V- mongoose - Model.find(conditions, [projection], [options], [callback]) http://mongoosejs.com/docs/api.html#model_Model.find
    Todo.find(function(err, todos){
        // V - javascript error handling
        if (err){
            // V - express responce method - res.send([body])
            res.send(err);
        }
        // V - express responce method - res.json([body])
        res.json(todos);
    });
});
//create a to-do and send it back
app.post('/api/todos', function(req, res){
    console.log('Headers: '+req.complete)
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todos){
        if (err){
            res.send(err);
        } 
        Todo.find(function(err, todos){
            if (err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});

//Delete a To-Do
app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo){
        if(err){
            res.send(err);
        }
        Todo.find(function(err, todos){
            if (err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});

//-----------TO BUY-----------

//Model
var Tobuy = mongoose.model('Tobuy', {
    text: String
});

//get all tobuys
// V-express method - app.get(path, callback [, callback ...])
app.get('/api/tobuys', function(req, res){
    // V- javascript method -arr.find(callback[, thisArg])
    Tobuy.find(function(err, tobuys){
        // V - javascript error handling
        if (err){
            // V - express responce method - res.send([body])
            res.send(err);
        }
        // V - express responce method - res.json([body])
        res.json(tobuys);
    });
});

//create a to-buy and send it back
app.post('/api/tobuys', function(req, res){
    Tobuy.create({
        text: req.body.text,
        done: false
    }, function(err, tobuys){
        if (err){
            res.send(err);
        } 
        Tobuy.find(function(err, tobuys){
            if (err){
                res.send(err)
            }
            res.json(tobuys);
        });
    });
});

//Delete a To-Do
app.delete('/api/tobuys/:tobuy_id', function(req, res){
    // V - mongoose method - Query#remove([criteria], [callback]) - http://mongoosejs.com/docs/api.html#query_Query-remove
    Tobuy.remove({
        _id : req.params.tobuy_id
    }, function(err, tobuy){
        if(err){
            res.send(err);
        }
        Tobuy.find(function(err, tobuys){
            if (err){
                res.send(err);
            }
            res.json(tobuys);
        });
    });
});

//Angular application send!
app.get('*', function(req, res){
    // V - express responce method - res.sendFile(path [, options] [, fn])
    res.sendfile('.public/index.html');
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the To-Do server...');
});
