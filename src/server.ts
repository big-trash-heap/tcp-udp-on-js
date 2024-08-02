import TCP from "node:net";
import UDP from "node:dgram";

const SERVER_PORT_TCP = 4000;
const SERVER_PORT_UDP = 4001;

const ServerTCP = TCP.createServer((socket) => {
  socket.on("data", (message) => {
    const remote = {
      family: socket.remoteFamily,
      address: socket.remoteAddress,
      port: socket.remotePort,
    };

    console.log(
      "{TCP}[DATA]",
      [remote.family, remote.address, remote.port],
      message.toString()
    );

    const send = (msg: string) => {
      socket.write(msg, (error) => {
        if (error) {
          console.error("{TCP}[ERROR][write]", error);
        }
      });
    };

    send("{TCP}[PING]");
  });
  socket.on("error", (error) => {
    console.error("{TCP}[ERROR][socket]", error);
  });
});

const ServerUDP = UDP.createSocket("udp4", (message, r) => {
  const remote = {
    family: r.family,
    address: r.address,
    port: r.port,
  };

  console.log(
    "{UDP}[DATA]",
    [remote.address, remote.port, remote.family],
    message.toString()
  );

  const send = (msg: string) => {
    ServerUDP.send(msg, remote.port, remote.address);
  };

  send("{UDP}[PING]");
}).bind(SERVER_PORT_UDP);

ServerTCP.listen(SERVER_PORT_TCP);
