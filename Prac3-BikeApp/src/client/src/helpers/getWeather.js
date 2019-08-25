var request = new XMLHttpRequest()


// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=b095fdecb42932d0486ec7678390b011', true)


request.onload = function() {
    var data = JSON.parse(this.response)
  
    if (request.status >= 200 && request.status < 400) {
      data.forEach(weather => {
        console.log(weather.main)
      })
    } else {
      console.log('error')
    }
  }
  