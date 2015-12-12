'use strict';

import { LayoutView } from 'orchestra';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template,
  className: 'players-container',
  regions: {
    addPlayer: '.add-player-container',
    players: '.players-container',
  }
});