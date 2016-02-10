import express from 'express';
import path from 'path';
import jade from 'jade';
import bodyParser from 'body-parser';

let app = express();
let webdir = path.join(path.resolve(__dirname, '../.tmp/web')),
	viewdir = path.join(path.resolve(__dirname, '../views'));

app.set('views', viewdir);
app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.use(express.static(webdir));
app.use(bodyParser.urlencoded({extended: true, inflate: true}));
app.use(bodyParser.json());
app.set('json spaces', 4);

app.use('*', (req, res) => {
	res.render('index', {});
});

// Server
app.listen(3000, () => {
	console.log('Listen on http://localhost:3000');
});