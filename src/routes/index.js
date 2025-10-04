import testRouter from './test/index.js';
import userRouter from './user/index.js';



function routerApi(app) {
  app.use('/test', testRouter);
  app.use('/user', userRouter)
}

export default routerApi;