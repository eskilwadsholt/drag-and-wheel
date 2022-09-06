import { Calculus } from "../helpers/calculus"
import type { Point } from "../helpers/calculus"

class Gesture {

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

    moveTo(P: Point) : Gesture {
        let result = new Gesture(P)
        result.start = this.start
        const dt = result.time - this.time
        const dx = result.P.x - this.P.x
        const dy = result.P.y - this.P.y

        if (dt > 0) {
            result.velocity = {
                x: this.velocity.x * 0.5 + 1000 * dx / dt * 0.5,
                y: this.velocity.y * 0.5 + 1000 * dy / dt * 0.5
            }
        }
        else {
            result.velocity = this.velocity
        }

        return result
    }
    
    distance() {
        return Calculus. distance(this.start.P, this.P)
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
}

export default gestures