var Article = function (selector) {
  this.$article = document.querySelector(selector)
}

Article.prototype.setText = function (text) {
  var words = text.trim().split(/\s+/)

  var html = ''
  var i

  for (i = 0; i < words.length; i++) {
    html += '<span class="word">' + words[i] + '</span>'
  }

  this.$article.innerHTML = html
  this.$words = document.querySelectorAll('.word')
  this.currentPos = -1
  this.gotoNextWord()
}

Article.prototype.onComplete = function (cb) {
  this._onComplete = cb;
}

Article.prototype.getCurrentWordText = function () {
  return this.getCurrentWord().textContent
}

Article.prototype.getCurrentWord = function () {
  return this.$words[this.currentPos]
}

Article.prototype.gotoNextWord = function () {
  var $word

  $word = this.getCurrentWord()
  if ($word) {
    $word.classList.remove('target')
  }

  this.currentPos++

  if (this.currentPos < this.$words.length) {
    $word = this.getCurrentWord()
    $word.classList.add('target')
  } else {
    if (this._onComplete) {
      this._onComplete()
    }
  }
}

window.zen = window.zen || {}
zen.Article = Article
