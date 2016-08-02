import { push, shift } from '../lib/queue'
import { strictEqual } from 'assert'

describe('queue', () => {
  it('queue push', () => {
    let queue = push({
      scheme: 'a'
    })
    strictEqual(queue.length, 1)
  })
})