let express = ('express');
let app = express();
app.use(express.static(__dirname+'/dist/ng-recetas'));
app.get('/*',(req,resp)=>{resp.sendFile(__dirname+'/dist/ng-recetas/index.html')});
app.listen(process.env.PORT || 8080);
