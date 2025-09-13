import testRouter from './test/index.js';


function routerApi(app) {
  app.use('/test', testRouter);

}

export default routerApi;