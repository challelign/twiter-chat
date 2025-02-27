"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useUser } from "@clerk/nextjs";

export default function Socket() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const { user } = useUser();
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      if (user) {
        socket.emit("NEW_USER", user?.username);
      }
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user]);

  return (
    <div className="border-red-800 border-2   px-4 ">
      <p className="font-bold">
        Status:{" "}
        {isConnected ? (
          <span className="text-green-500">connected</span>
        ) : (
          <span className="text-red-500">disconnected</span>
        )}
      </p>
      <p className="font-bold flex">
        <span className=""> Transport:</span>
        <span className="text-yellow-300">{transport}</span>
      </p>
    </div>
  );
}
