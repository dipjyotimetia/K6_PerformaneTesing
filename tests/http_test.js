import http from "k6/http";
import { check, sleep } from "k6";

// `options.stages to configure ramp up/down VU level
export let options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m30s", target: 10 },
    { duration: "20s", target: 0 },
  ]
}

// this defines the entry point for your VUs
// similar to the main() function in many other language

export default function() {
  let res = http.get("http://test.loadimpact.com");
  
  // check() function to verify status code, transaction time etc
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  sleep(1);
}