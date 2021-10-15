import {
  mount
} from '@vue/test-utils'
import {
  new
} from '@/pages/games/new.vue'

describe('Game profile page', () => {
  test('loads a game via ajax', (done) => {
    function callback(data) {
      try {
        expect(data).toNotBe(null);
        done();
      } catch (error) {
        done(error);
      }
    }

    fetchData(callback);
  })
})
