# saber-interval

```bash
npm install saber-interval
```

> scheduleUpdate

```ts
let frame: FrameProps = {
  delta: 100,
  isStop: false
}

schedule(dt => console.log('update', dt), frame)

setTimeout(() => {
  frame.isStop = true
}, 2000)

// schedule(() => console.log('simple update!'))
```
