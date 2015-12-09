import { Application, $ } from 'orchestra';
import LayoutView from './layout';

export default Application.extend({
  initialize() {
    this.$body = $(document.body);
    this.layout = new LayoutView();
    this.layout.render();
  }
});