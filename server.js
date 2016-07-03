var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//mongoose.connect('')
//mongoose.connect("mongodb://localhost/to-do");
//var url = process.env.DATABASEURL || "mongodb://localhost/to-do";
//mongoose.connect(url);
mongoose.connect("mongodb://lang:LGiscool@ds011775.mlab.com:11775/to-do" || "mongodb://localhost/to-do");

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

//-----------TO DO-----------

//Model
var Todo = mongoose.model('Todo', {
    text: String
})

//get all todos
app.get('/api/todos', function(req, res){
    Todo.find(function(err, todos){
        if (err){
            res.send(err);
        }
        res.json(todos);
    })
})

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
                res.send(err)
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
})

//get all tobuys
app.get('/api/tobuys', function(req, res){
    Tobuy.find(function(err, tobuys){
        if (err){
            res.send(err);
        }
        res.json(tobuys);
    })
})

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
    res.sendfile('.public/index.html');
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the To-Do server...');
});
