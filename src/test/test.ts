import { interval } from '../core/saber-interval'

interval(() => console.log('update1'), 400)
interval(() => console.log('update2'), 800)
