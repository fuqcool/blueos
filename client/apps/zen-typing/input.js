var InputArea = function (selector) {
  this.$input = document.querySelector(selector)
  this._onKey = null
  that = this

  this.$input.onkeyup = function (evt) {
    if (that._onKey) {
      that._onKey(evt.which)
    }
  }

  this.$input.onkeydown = function (evt) {
    if (evt.which === 32) {
      evt.preventDefault()
    }
  }
}

InputArea.prototype.getText = function () {
  return this.$input.value
}

InputArea.prototype.setText = function (text) {
  this.$input.value = text
}

InputArea.prototype.onKey = function (cb) {
  this._onKey = cb
}

window.zen = window.zen || {}
zen.InputArea = InputArea;
