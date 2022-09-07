import { Calculus } from "../helpers/calculus"
import type { Point } from "../helpers/calculus"

export class Gesture {

    start: Gesture
    time: number
    P: Point
    velocity: Point

    constructor(P: Point) {
        this.time = Date.now()
        this.P = P
        this.start = this
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    moveTo = (P: Point) => {
        let result = new Gesture(P)
        result.start = this.start
        const dt = result.time - this.time
        const dx = result.P.x - this.P.x
        const dy = result.P.y - this.P.y

        const keep = Math.exp(-dt * 0.025)
        const add = 1 - keep
        // Pixel movement per second
        const newX = 1000 * dx / dt
        const newY = 1000 * dy / dt
        result.velocity = {
            x: add * newX + keep * this.velocity.x,
            y: add * newY + keep * this.velocity.y
        }

        return result
    }
    
    distance = () => {
        return Calculus. distance(this.start.P, this.P)
    }

    duration = () => {
        return this.time - this.start.time
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function demo() {
    let current = new Gesture({
        x: 10,
        y: 12
    })

    console.log(current)

    await delay(10)

    current = current.moveTo({
        x: 7,
        y: 6
    })

    console.log(current)

    await delay(20)

    current = current.moveTo({
        x: 2,
        y: -1
    })

    console.log(current)
}

export type GestureInfo = { 
    detail?: {
        e?: MouseEvent | TouchEvent
        gesture: Gesture
    }
}

class GestureManager {

    node: HTMLElement
    gesture: Gesture

    constructor(node: HTMLElement) {
        this.node = node
    }

    // Mouse handlers
    mouseDown = (e: MouseEvent) => {
        document.addEventListener("mousemove", this.mouseMove)
        document.addEventListener("mouseup", this.mouseUp)

        this.down(e, {
            x: e.clientX,
            y: e.clientY
        })
    }

    mouseMove = (e: MouseEvent) => {
        this.move(e, {
            x: e.clientX,
            y: e.clientY
        })
    }

    mouseUp = () => {
        document.removeEventListener("mousemove", this.mouseMove)
        document.removeEventListener("mouseup", this.mouseUp)

        this.up()
    }

    // Touch handlers
    singleTouchPoint = (e: TouchEvent) : Point => {
        const singleTouch = e.touches[0]

        return {
            x: singleTouch.clientX,
            y: singleTouch.clientY
        }
    }

    touchDown = (e: TouchEvent) => {
        if (e.touches.length != 1) return

        document.addEventListener("touchmove", this.touchMove)
        document.addEventListener("touchend", this.touchUp)

        this.down(e, this.singleTouchPoint(e))
    }

    touchMove = (e: TouchEvent) => {
        if (e.touches.length != 1) return

        this.move(e, this.singleTouchPoint(e))
    }

    touchUp = () => {
        document.removeEventListener("touchmove", this.touchMove)
        document.removeEventListener("touchend", this.touchUp)

        this.up()
    }

    // Event dispatchers
    down = (e: MouseEvent | TouchEvent, P: Point) => {
        this.gesture = new Gesture(P)
        const info: GestureInfo = { detail: {
                e,
                gesture: this.gesture
        }}
        this.node.dispatchEvent(new CustomEvent("down", info))
    }

    move = (e: MouseEvent | TouchEvent, P: Point) => {
        this.gesture = this.gesture.moveTo(P)
        const info: GestureInfo = { detail: {
            e,
            gesture: this.gesture
        }}
        this.node.dispatchEvent(new CustomEvent("move", info))
    }

    up = () => {
        this.node.dispatchEvent(new CustomEvent("up"))
    }
}

function gestures(node: HTMLElement) {
    demo()

    const manager = new GestureManager(node)
    node.addEventListener("mousedown", manager.mouseDown)
    node.addEventListener("touchstart", manager.touchDown)
}

export default gestures