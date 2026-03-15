let instance

export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm.mp3'

    this.shootAudio     = new Audio()
    this.shootAudio.src = 'audio/bullet.mp3'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/boom.mp3'

    this.playBgm()
  }

  playBgm() {
    const p = this.bgmAudio.play()
    if (p && p.catch) {
      p.catch(() => {
        const resume = () => {
          this.bgmAudio.play()
          document.removeEventListener('touchstart', resume)
          document.removeEventListener('mousedown', resume)
        }
        document.addEventListener('touchstart', resume)
        document.addEventListener('mousedown', resume)
      })
    }
  }

  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play().catch(() => {})
  }

  playExplosion() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play().catch(() => {})
  }
}
