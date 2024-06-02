const get = require('simple-get')

const URLS = [
    "http://funnyvale.online",
    "https://funnyvale.online",
    "http://www.funnyvale.online",
    "https://www.funnyvale.online"
]

const TARGET = "https://funnyvale.online"

function getWithRedirects(url){
    get(url, function (err, res) {
      if (err) throw err

    //   const headers = res.headers

      console.log(res.statusCode) // 200
      console.log(res.headers)

      res.pipe(process.stdout) // `res` is a stream
    })
}

function getNoRedirects(url, target){
    let opts = {
        url: url,
        followRedirects: false
    }

    get(opts, function (err, res) {
        if (err) throw err
        let redirectLocation = res.headers.location ?? opts.url
        redirectLocation = redirectLocation.replace(/\/$/, "")

        let status = (redirectLocation == target) ? "PASS" : "FAIL"

        console.log(`${url}\t->\t${redirectLocation}\t${res.statusCode}\t${status}`)
      })
}

function checkRedirects(urls, target){
    console.log(urls)
    urls.forEach(url => getNoRedirects(url, target))
}

checkRedirects(URLS, TARGET)


