import express from "express";
import {LocalStorage} from "node-localstorage";
var localStorage = new LocalStorage('./scratch');
const app = express();
const port = 3000;
var task;
if(localStorage.getItem("task")){
    task = localStorage.getItem("task").split(",") 
}else{
    task = [];
}

var workTask;
if(localStorage.getItem("workTask")){
    workTask = localStorage.getItem("workTask").split(",") 
}else{
    workTask = [];
}

app.use(express.static("public"));
app.use(express.urlencoded({extended:true})); 
app.get("/",(req,res)=>{
    res.render("index.ejs",{task });
}); 

app.post("/addTask",(req,res)=>{
    var {newItem} = req.body;
    task.push(newItem);
    localStorage.setItem("task",task);
    res.render("index.ejs",{task });
})

app.get("/work",(req,res)=>{
    res.render("work.ejs",{workTask});
})

app.post("/workTask",(req,res)=>{
    var {newItem} = req.body;
    workTask.push(newItem);
    localStorage.setItem("workTask",workTask);
    res.render("work.ejs",{workTask});
})

app.listen(port,()=>{
    console.log(`Server listening at port:${port}`);
})