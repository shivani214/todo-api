var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [//{
    // id: 1,
    // description: 'Meet gaurang for lunch',
    // completed: false
    //},
    //  {
    //    id: 2,
    //  description: 'Go to market with gaurang',
    //completed: false

    //},
    //{
    //  id: 3,
    //description: "Go to home",
    //completed: true
    //} 
];
var todoNextId = 1;
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Todo API ROOT');

});


//get / todos
app.get('/todos', function (req, res) {
    res.json(todos);
});
//Get / todos/:id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);

    var matchedTodo = _.findWhere(todos, { Id: todoId });

    if (matchedTodo) {
        res.json(matchedTodo);
    }
    else {
        res.status(404).send();
    }
});
app.post('/todos', function (req, res) {
    var bodyTemp = req.body;
var body = _.pick(bodyTemp,'description', 'completed');

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){

    return res.status(400).send();
    }
    body.description = body.description.trim();


    body.Id = todoNextId++;

    todos.push(body);

    console.log('description: ' + body.description);

    res.json(body);

});

app.listen(PORT, function () {
    console.log('Express listen on port ' + PORT + '!');
});