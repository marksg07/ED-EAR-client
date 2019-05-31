import document from "document";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";
import { me } from "appbit";
import { display } from "display";

messaging.peerSocket.onopen = function() {
  if (HeartRateSensor) {
    console.log("This device has a HeartRateSensor!");
    const hrm = new HeartRateSensor({frequency: 0.2});
    console.log("turning off app tm")
    me.appTimeoutEnabled = false;
    display.on = false;
    hrm.addEventListener("reading", () => {
      if (me.appTimeoutEnabled) {
        console.log("turning off app tm")
        me.appTimeoutEnabled = false;
      }
      console.log(`Current heart rate: ${hrm.heartRate}`);
      const toCompanion = {"heartrate": hrm.heartRate, "timestamp": hrm.timestamp};
      if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
       // Send the data to peer as a message
        console.log("Sending HR paack with hr= " + hrm.heartRate);
        messaging.peerSocket.send(toCompanion);
      }
    });
    hrm.start();
  } else {
     console.log("This device does NOT have a HeartRateSensor!");
  }
}
