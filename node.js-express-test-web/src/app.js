var express=require ('express'); //Set framework  'EXPRESS'
var bodyParser=require('body-parser'); 
var app=express(); 
var port=5000;
app.locals.pretty = true;

app.use('/images', express.static(__dirname+'/../public/images')); // static web page folder  
app.use('/css', express.static(__dirname+'/../public/css')); // static web page folder  
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','jade'); //Set template engine 'JADE'
app.set('views','../views'); //Set template folder 

app.listen(port, ()=>{    console.log('Connected port '+port) })

/* ROUTING */
app.get('/', (req,res)=>{  
    res.render('main',{time:Date(), title_name:'Node.js Test Node'}); //render and response 
  });    
app.get('/login', (req,res)=>{    res.send('<h1>Login please</h1>');    })
app.get('/route', (req,res)=>{    res.send('<h2>Hello Router<h2> <img src="/images/route.png">')      });
app.get('/dynamic', (req,res)=>{    res.send('<H2> HELLO DYNAMIC </H2>')      });
app.get('/dynamic2', (req,res)=>{    
    var lis='';
    for (var i=0;i<5;i++){
        lis = lis + '<li> coding </li>'
    }

    var time = Date();
    output = (`
        <HTML>
        <body>
            <H2> HELLO DYNAMIC 2 </H2>
            <UL>
            ${lis}
            </UL>
            <H3>${time}</H3>
        <body>
        </HTML>`
    )
    res.send(output);      
});

// http://localhost:5000/template  JADE templates
app.get('/template', (req,res)=>{    
    res.render('templ',{time:Date(), title_name:'JADE'}); //render and response 
});

// http://localhost:5000/topic?id1=1 
app.get('/topic', (req,res)=>{    
        var topics = [
            'Javascript',
            'Node.js',
            'Express'
        ]

        var str =`
        <a href="/topic?id1=0">JavaScript</a><br><br>
        <a href="/topic?id1=1">Node.js</a><br><br>
        <a href="/topic?id1=2">Express</a><br><br>
        `
        var output = str + topics[req.query.id1]+ " is selected.";
        //res.send(req.query.id1+','+req.query.name); 
        res.send(output); 
        
});

// http://localhost:5000/topic-symentic/1
app.get('/topic-symentic/:id1', (req,res)=>{    

    var topics = [
        'Javascript',
        'Node.js',
        'Express'
    ]

    var str =`
    <a href="/topic-symentic/0">JavaScript</a><br><br>
    <a href="/topic-symentic/1">Node.js</a><br><br>
    <a href="/topic-symentic/2">Express</a><br><br>
    `
    var output = str + topics[req.params.id1] + " is selected.";
    res.send(output); 
    
});

// http://localhost:5000/topic-symentic/1/10/hello
app.get('/topic-symentic/:id/:mode/:name', (req,res)=>{    

    var output = "parameter form:   /topic-symentic/:id/:mode/:name"
    output = "req.params.id = "+req.params.id;
    output = "req.params.mode = "+req.params.mode;
    output = "req.params.name = "+req.params.name;

    res.send(output);     
});

app.get('/form', (req,res)=>{    
    res.render('form',{time:Date(), title_name:'JADE'}); //render and response 
});

// GET method - not good for log name and password or long URL 
// return URL has response detail in URL
// e.g. http://localhost:5000/form_receiver?title=value-01&description=value-02
// URL length problem (limited URL path length)
// data broken issue 

app.get('/form_receiver', (req,res)=>{    
    var title = req.query.title;
    var description = req.query.description;
    res.send('GET method    '+title+', '+description);  
});

// POST method - not good for logn name and password 
// return URL does not have response detail in URL
// e.g. http://localhost:5000/form_receiver

app.post('/form_receiver', (req,res)=>{    
    var title = req.body.title;
    var description = req.body.description;
    res.send('POST method   '+title+', '+description);  
});

// ERROR - POST doesnt not receieved any 
app.post('/post', (req,res)=>{    
    res.send('Hi POST');  
});

