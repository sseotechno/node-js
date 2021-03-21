/*
    Node.js Testing - enhanced 20190309
 */
var express=require('express');
var bodyParser=require('body-parser'); 
var fs=require('fs'); 
var app = express();

app.locals.pretty = true;
var port = 5000;

var data_folder='../data-folder/';
var form_folder='../viewsfile';

app.use(express.static('public')); // static web page folder  
app.use(bodyParser.urlencoded({extended:false}))

// folder name should be only with alphabet. No extra char e.g. (X) views-file (o) viewsfile
app.set('view engine','jade');
app.set('views',form_folder)
app.listen(port, function (){});
console.log ('Connnected.'+port+' port!');


// ROUTER 

app.get('/', (req,res)=>{
    res.redirect("/topic/list");
})

app.get('/topic', (req,res)=>{
    res.redirect("/topic/list");
})

//////////////////////////////
// Merging /topic and /topic:id path
// :id - Varible in parameter 
//////////////////////////////
app.get(['/topic/list','/topic/list/:id'], (req,res)=>{
    console.log ('Merged !');
    fs.readdir(data_folder,(err,files)=>{
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error'); 
        }

        var id = req.params.id; 
        if (id) {
            fs.readFile(data_folder+id,'utf8',(err,data)=>{
                if (err){
                    console.log(err);
                    res.status(500).send('Internal Server Error'); 
                }
                res.render('view',{topics:files, title:id, desc:data});
            })
        }
        else{
            res.render('view', {topics:files,title:'Welcome', desc:'Hello. Node.js is great for API'});
        }
    })
})

//render and response 
app.get('/topic/new', (req,res)=>{

    fs.readdir(data_folder,(err,files)=>{
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error'); 
        }
        res.render('newform-enh', {topics:files}); 
    })
});

app.post('/topic/write', (req,res)=>{
    console.log('POST method with /topic/write is called');
    
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile(data_folder+title,description, (err)=>{
        if (err){
            res.status(500).send('Internal Server Error' + err.message);  
        }
        else
        {
            res.redirect("/topic/list");
        }
    })   
})

