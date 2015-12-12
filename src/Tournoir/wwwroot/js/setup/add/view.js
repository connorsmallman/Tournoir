'use strict';

import { ItemView, Radio } from 'orchestra';
import template from './template.hbs';

const playerChannel = Radio.channel('player');

export default ItemView.extend({
  template,
  className: 'add-player-form',
  ui: {
    'add': '.js-add-player',
    'playerName': '.js-player-name',
  },
  events: {
    'click @ui.add': 'addPlayer',
  },
  addPlayer(e) {
    let playerName = this.ui.playerName.val();
    playerChannel.trigger('add:player', playerName);
  },
});
