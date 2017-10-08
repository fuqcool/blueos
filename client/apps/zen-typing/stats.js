var Stats = function () {
  this.startTime = null
  this.totalNum = 0
  this.numOfCorrect = 0
}

Stats.prototype.start = function () {
  this.startTime = new Date()
}

Stats.prototype.correct = function () {
  this.numOfCorrect++
  this.totalNum++
}

Stats.prototype.error = function () {
  this.totalNum++
}

Stats.prototype.report = function () {
  var stopTime = new Date()
  var minutes = (stopTime.getTime() - this.startTime.getTime()) / (60 * 1000)

  return {
    wpm: Math.round(this.numOfCorrect / minutes),
    successRate: Math.round((this.numOfCorrect / this.totalNum) * 100)
  }
}

window.zen = window.zen || {}
zen.Stats = Stats
