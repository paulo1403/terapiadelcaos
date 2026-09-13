declare module 'curtainsjs' {
  export class Curtains {
    constructor(options?: Record<string, unknown>)
    dispose(): void
    onScroll(callback: () => void): void
  }
  export class Plane {
    constructor(curtains: Curtains, element: Element, options?: Record<string, unknown>)
    onReady(callback: () => void): void
    onRender(callback: () => void): void
    remove(): void
  }
}
