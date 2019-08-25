import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import koaRes from 'koa-res';
import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import sessionRoutes from './routes/sessionRoutes';
import goalsRoutes from './routes/goalsRoutes';
import loginRoutes from './routes/loginRoutes';
import locationRoutes from './routes/locationRoutes';
import cors from 'koa2-cors';
const PORT = process.env.PORT || 1337;

const app = new Koa();

// Middleware
app.use(logger());
app.use(bodyParser());
app.use(koaRes({debug: true}));
app.use(cors());

// Routes
app.use(goalsRoutes.routes());
app.use(indexRoutes.routes());
app.use(locationRoutes.routes());
app.use(loginRoutes.routes());
app.use(sessionRoutes.routes());
app.use(userRoutes.routes());

const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default server;
