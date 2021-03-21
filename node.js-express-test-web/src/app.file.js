var express=require('express');
var bodyParser=require('body-parser'); 
var fs=require('fs'); 
var app = express();

app.locals.pretty = true;

app.use(express.static('public')); // static web page folder  
app.use(bodyParser.urlencoded({extended:false}))

// folder name should be only with alphabet. No extra char e.g. (X) views-file (o) viewsfile

var port = 5000;

app.set('view engine','jade');
app.set('views','viewsfile')
app.listen(port, function (){});
console.log ('Connnected.'+port+' port!');

// ROUTER 
app.get('/topic/get', (req,res)=>{
    res.send("Hi GET method");
});

app.post('/topic/write', (req,res)=>{
    console.log('POST method with /topic/write is called');
    
    var title = req.body.title;
    var description = req.body.description;
    //res.send('POST method:   '+title+', '+description);  

    fs.writeFile('./data-folder/'+title,description, (err)=>{
        if (err){
            
            res.status(500).send('Internal Server Error' + err.message);  
        }
        else
        {
            // res.send('POST method   '+title+', '+description);  
            res.send('success');  
        }
    })   
})

app.get('/topic/list', (req,res)=>{
    console.log ('Hi GET Method !');
    fs.readdir('./data-folder',(err,files)=>{
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error'); 
        }
        else
        {
            res.render('view', {topics:files});
        }
    })
})

//render and response 
app.get('/topic/new', (req,res)=>{
    res.render('newform'); 
});

// :id - Varible in parameter 
app.get('/topic/list/:id', (req,res)=>{
    var id = req.params.id;
    fs.readdir('./data-folder',(err,files)=>{
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error'); 
        }
        fs.readFile('./data-folder/'+id,'utf8',(err,data)=>{
            if (err){
                console.log(err);
                res.status(500).send('Internal Server Error'); 
            }
            else{
                res.render('view',{topics:files, title:id, desc:data});
            }
            
        })
    })
})



