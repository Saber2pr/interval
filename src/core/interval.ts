/*
 * @Author: saber2pr
 * @Date: 2019-05-07 13:26:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-07 14:26:16
 */
export class Interval {
  public constructor()
  public constructor(delta: number)
  public constructor(delta: number, nextTime: number)
  public constructor(
    private delta: number = 16,
    private nextTime: number = Date.now() + delta
  ) {}
  private handle: number
  private updateQueue: FrameRequestCallback[] = []

  public setDelta(delta: number) {
    this.delta = delta
    return this
  }

  public push(...update: FrameRequestCallback[]) {
    this.updateQueue.push(...update)
    return this
  }

  public remove(update: FrameRequestCallback) {
    const index = this.updateQueue.indexOf(update)
    if (index === -1) {
      throw new Error('cannot find FrameRequestCallback to shift')
    } else {
      return this.updateQueue.splice(index, 1)
    }
  }

  private updateNextTime() {
    this.nextTime = Date.now() + this.delta
  }

  private update: FrameRequestCallback = async time => {
    if (!this.updateQueue.length) {
      return
    }

    if (Date.now() > this.nextTime) {
      this.updateQueue.forEach(u => u(time))
      this.updateNextTime()
    }

    this.handle = requestAnimationFrame(this.update)
  }

  public execute() {
    this.handle = requestAnimationFrame(this.update)
    return this.handle
  }

  public cancel() {
    this.updateQueue.length = 0
    cancelAnimationFrame(this.handle)
  }
}
