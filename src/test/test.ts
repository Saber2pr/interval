import { schedule } from '../core/saber-interval'

schedule(dt => console.log('update', dt), { delta: 100, delayCancel: 2000 })

// schedule(() => console.log('simple update!'))
