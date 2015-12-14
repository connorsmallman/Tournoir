'use strict';

import { LayoutView } from 'orchestra';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template,
  className: 'setup-container',
  ui: {
    'generate':'.js-generate-tournament',
  },
  showGenerateTournament() {
    this.ui.generate.show();
  },
  hideGenerateTournament() {
    this.ui.generate.hide();
  },
  regions: {
    addPlayer: '.add-player-container',
    players: '.players-container',
  }
});