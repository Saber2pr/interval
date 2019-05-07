# @saber2pr/interval

> Interval use requestAnimationFrame.

```bash
npm install @saber2pr/interval
```

# API

```ts
const interval = new Interval() // delta is 16

const interval = new Interval(1000) // delta is 1000
```

## Interval.push

```ts
const update1 = time => console.log('update1', time)
const update2 = time => console.log('update2', time)

interval.push(update1, update2)
```

## interval.remove

```ts
const update1 = time => console.log('update1', time)

interval.remove(update1)
```

## interval.setDelta

```ts
interval.setDelta(500) // delta is changed to 500
```

## interval.execute

```ts
interval.execute() // interval is starting...
```

## interval.cancel

```ts
interval.cancel() // interval is canceled.
```

# Author

> saber2pr
