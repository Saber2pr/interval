# saber-interval

```bash
npm install saber-interval
```

> scheduleUpdate

```ts
// simple update
schedule(() => console.log('simple update!'))

// delay cancel update
schedule(() => console.log('delay cancel update!'), {
  delta: 100,
  delayCancel: 2000
})

// setTimeout 2000
scheduleOnce(dt => console.log('setTimeout!', dt), 2000)

call(() => console.log('call func 5 times!'), 5)
```
