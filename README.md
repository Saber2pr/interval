# saber-interval

```bash
npm install

npm start
```

> run ts in browser

> scheduleUpdate

```ts
let frame = {
  delta: 1000
}

setTimeout(() => {
  frame.delta = 100
}, 3000)

schedule(dt => console.log('update', dt), frame)

schedule(dt => console.log('update', dt), 1000)

schedule(dt => console.log('update', dt))
```
