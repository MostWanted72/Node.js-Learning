const http = require('http');
const fs = require('fs');

const listener = (req, res) => {
  // shows request url, request method by api, request headers 
  // console.log(req.url, req.method, req.headers);

  // ends the event loop
  // process.exit()

  // url and method 
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    // res.write is used to write the content that needs to be sent back to broswer/client
    res.write(
      `<html>
        <head><title>Enter Message</title></head>
        <body>
          <form action='/message' method='POST'>
            <input name='messages' type='text'>
              <button type='submit'>Send</button>
            </input>
          </form>
        </body>
      </html>`
    )

    // concludes the response and return skips the later part of the code /  skips to next event loop
    return res.end()
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    // req.on() takes a event type just like 'mouseenter', 'mouseout' etc here we are checking for data, if our request has data attached in body, this data is recived in the form of buffer, which is a stream of data chunks, untill we have all the data, we can't really do anything to it, but this is usefull in streaming or file upload/download.
    req.on('data', (chunk) => body.push(chunk));

    // this is triggered when the request event is completed, here we can asure ourselves that we have all the chunk data and we can do something with it, like here we are saving the data recived into text file.
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('check this part', parsedBody)
      fs.writeFileSync('message.txt', parsedBody.split('=')[1]);
    })

    // setting status code of response 302;
    res.statusCode = 302;

    // setting response url 
    res.setHeader('Location', '/');
  
    return res.end()
  }

  // setting content type of response to text/html here the file sent should be in string and contain html text
  res.setHeader('Content-Type',  'text/html');

  res.write(
    `<html>
      <head><title>My First Page</title></head>
      <body>
        <h1>Hello from my first page</h1>
      </body>
    </html>`
  )

  res.end()
};

const server = http.createServer(listener);

server.listen(3000)