
  function natIP() {
  var w = window.location;
  var host = w.host;
  var port = w.port || 80;
  var Socket = (new java.net.Socket(host,port)).getLocalAddress().getHostAddress();
 console.log(host);
 console.log(port);
  return Socket;
}


