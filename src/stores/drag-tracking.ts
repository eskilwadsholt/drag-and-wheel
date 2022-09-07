import { writable } from 'svelte/store'
import type { Gesture } from '../events/gestures'

export const currentGesture = writable<Gesture | null>(null)