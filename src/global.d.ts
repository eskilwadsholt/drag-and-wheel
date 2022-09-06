/// <reference types="svelte" />

declare namespace svelte.JSX {
    interface HTMLProps<HTMLElement> {
      down?: (e) => void
      move?: (e) => void
      up?: () => void
    }
}