import { Route } from 'orchestra';
import Collection from './collection';
import ColumnsView from './collection-view';

export default Route.extend({
  initialize(options = {}) {
    this.collection = new Collection([ 
      { 
        columnId: 1,
        isLastColumn: false,
        tiles:  [
          {
            tileId: 1,
            position: 1,
            nextTileId: 3,
            player: {
              playerId: 1,
              playerName: 'Connor'
            },
          },
          {
            tileId: 2,
            position: 2,
            nextTileId: 3,
            player: {
              playerId: 2,
              playerName: 'Rob'
            }
          }
        ]
      }
    ]);
    this.layout = options.layout;
  },

  // fetch() {
  //   return this.collection.fetch();
  // },

  render() {
    this.layout.getRegion('columns').show(new ColumnsView({
      collection: this.collection,
    }));
  }
});