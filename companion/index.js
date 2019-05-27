import * as messaging from "messaging";
import { me } from "companion";
//import { fetch } from "fetch";
me.wakeInterval = 300000;
messaging.peerSocket.onmessage = function(evt) {
  me.wakeInterval = 300000;
  let headers = {'Content-Type': 'application/json'}
  console.log(evt);
  console.log("Received HR " + evt.data.heartrate);
  fetch("http://127.0.0.1:9673/heartrate", {method: 'POST', headers: headers, body: JSON.stringify(evt.data)});
}