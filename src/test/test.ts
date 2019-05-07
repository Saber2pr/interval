import { Interval } from '../core/interval'

const interval = new Interval(1000)

const update = (time: any) => {
  if (time > 5000) {
    interval.setDelta(500)
  }

  if (time > 10000) {
    interval.remove(update)
  }

  console.log('update', time)
}

const update2 = time => {
  if (time > 15000) {
    interval.cancel()
  }
  console.log('update2', time, time > 15000)
}

interval.push(update, update2)

interval.execute()
