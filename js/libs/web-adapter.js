/**
 * Browser adapter — replaces the WeChat Mini Game weapp-adapter.
 * Sets up a global `canvas`, handles resize, and converts
 * desktop mouse events into touch-like events so the game
 * code (which only listens for touch) works on both mobile and desktop.
 */

const c = document.getElementById('canvas')
c.width  = window.innerWidth
c.height = window.innerHeight

window.canvas = c

window.addEventListener('resize', () => {
  c.width  = window.innerWidth
  c.height = window.innerHeight
})

// ---- Mouse → Touch conversion for desktop browsers ----

const origAdd    = c.addEventListener.bind(c)
const origRemove = c.removeEventListener.bind(c)

const touchHandlers = {
  touchstart: [],
  touchmove:  [],
  touchend:   [],
}

c.addEventListener = function (type, handler, opts) {
  if (touchHandlers[type]) {
    touchHandlers[type].push(handler)
  }
  origAdd(type, handler, opts)
}

c.removeEventListener = function (type, handler, opts) {
  if (touchHandlers[type]) {
    const idx = touchHandlers[type].indexOf(handler)
    if (idx >= 0) touchHandlers[type].splice(idx, 1)
  }
  origRemove(type, handler, opts)
}

function makeTouchEvent(type, mouse) {
  const touch = {
    identifier: 0,
    clientX: mouse.clientX,
    clientY: mouse.clientY,
    pageX:   mouse.pageX,
    pageY:   mouse.pageY,
  }
  const list = type === 'touchend' ? [] : [touch]
  return {
    type,
    touches:        list,
    targetTouches:  list,
    changedTouches: [touch],
    preventDefault()  {},
    stopPropagation() {},
    target:        c,
    currentTarget: c,
    timeStamp:     mouse.timeStamp,
  }
}

let mouseDown     = false
let lastTouchTime = 0

origAdd('touchstart', () => { lastTouchTime = Date.now() })
origAdd('touchend',   () => { lastTouchTime = Date.now() })

origAdd('mousedown', (e) => {
  if (Date.now() - lastTouchTime < 500) return
  mouseDown = true
  const te = makeTouchEvent('touchstart', e)
  touchHandlers.touchstart.forEach(h => h(te))
})

origAdd('mousemove', (e) => {
  if (!mouseDown || Date.now() - lastTouchTime < 500) return
  const te = makeTouchEvent('touchmove', e)
  touchHandlers.touchmove.forEach(h => h(te))
})

origAdd('mouseup', (e) => {
  if (!mouseDown) return
  mouseDown = false
  if (Date.now() - lastTouchTime < 500) return
  const te = makeTouchEvent('touchend', e)
  touchHandlers.touchend.forEach(h => h(te))
})
