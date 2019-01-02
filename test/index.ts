import { schedule } from '../lib/interval'

let frame = {
  delta: 1000
}

setTimeout(() => {
  frame.delta = 100
}, 3000)

schedule(dt => console.log('update', dt), frame)

schedule(dt => console.log('update', dt), 1000)

schedule(dt => console.log('update', dt))
