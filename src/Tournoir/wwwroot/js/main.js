'use strict';

import Application from './application/application';
import SetupRouter from './setup/router';

let app = new Application();

app.setup = new SetupRouter({
  container: app.layout.content
});

app.start();