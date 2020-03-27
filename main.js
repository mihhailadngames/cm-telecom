function getValue(name) {
  return document.getElementById(name).value;
}
function getData() {
  return {
    api: getValue('api'),
    from: getValue('from'),
    to: getValue('to'),
    message: getValue('message'),
  }
}
function sendMessage() {
  const data = getData();
  fetch('https://gw.cmtelecom.com/v1.0/message', {
    method: 'post',
    body: JSON.stringify({
      "messages": {
        "authentication": {
          "productToken": data.api
        },
        "msg": [{
          "body": {
            "type": "auto",
            "content": data.message
          },
          "to": [{
            "number": data.to
          }],
          "from": data.from,
          "allowedChannels": ["SMS"]
        }]
      }
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(result => console.log(result)).catch((err) => console.log(err));
}
