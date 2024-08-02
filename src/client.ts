import TCP from "node:net";
import UDP from "node:dgram";

const SERVER_PORT_TCP = 4000;
const SERVER_PORT_UDP = 4001;
const SERVER_HOST = "127.0.0.1";

const tcp = TCP.createConnection(SERVER_PORT_TCP, SERVER_HOST, () => {
  // connect
})
  .on("data", (data) => {
    console.log(data.toString());
  })
  .on("error", (error) => {
    console.error("{TCP}[ERROR][server]", error);
  });

setInterval(() => {
  tcp.write("Hello");
}, 1000);

const udp = UDP.createSocket("udp4", (message) => {
  console.log(message.toString());
});

udp.connect(SERVER_PORT_UDP, SERVER_HOST, () => {
  // connect
});

setInterval(() => {
  udp.send("HELLO", SERVER_PORT_UDP, SERVER_HOST);
}, 2000);
