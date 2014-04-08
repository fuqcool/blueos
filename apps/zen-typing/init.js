window.zen = window.zen || {}

zen.init = function () {
  var inputArea = new zen.InputArea('#input-area')
  var article = new zen.Article('#text-panel')
  var stats = new zen.Stats()
  var $btnStart = document.querySelector('#btn-start')

  inputArea.setText('')
  inputArea.onKey(function (code) {
    var expect = article.getCurrentWordText()
    var actual = inputArea.getText()

    if (code === 32) {
      if (expect === actual) {
        article.gotoNextWord()
        inputArea.setText('')
        stats.correct()
      } else {
        inputArea.$input.classList.add('error')
        stats.error()
      }
    } else {
      if (expect.indexOf(actual) !== 0) {
        inputArea.$input.classList.add('error')
      } else {
        inputArea.$input.classList.remove('error')
      }
    }
  })

  article.onComplete(function () {
    togglePanel()
    report = stats.report()

    var $result = document.querySelector('#result')
    $result.innerHTML = 'Word per Minute: ' + report.wpm + ', Success Rate: ' + report.successRate + '%'
  })

  var articleNum = -1;

  $btnStart.onclick = function () {
    while (true) {
      var num = Math.floor((Math.random() * 4 ) + 1)
      if (articleNum !== num) {
        articleNum = num
        break;
      }
    }
    var f = 'article/' + num + '.txt'
    httpGet(f, function (content) {
      article.setText(content)
      document.querySelector('#result').innerHTML = ''
      togglePanel()

      stats.start()
      inputArea.$input.focus()
    })
  }

  function httpGet(url, cb) {
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status === 200) {
        cb && cb(xhr.responseText)
      }
    }

    xhr.open('get', url, true)
    xhr.send()
  }

  function togglePanel() {
    var $typingPanel = document.querySelector('#typing-panel')

    if ($typingPanel.style.display === 'block') {
      $typingPanel.style.display = 'none'
      $btnStart.style.display = 'block'
    } else {
      $typingPanel.style.display = 'block'
      $btnStart.style.display = 'none'
    }
  }
}
