import { useEffect, useState, createContext } from "react";
import VirtualSpace from "../classes/virtual-space";

export const VirtualSpaceContext = createContext({});

export default function VirtualSpaceWidget({ virtual_room_id }) {
  // This will create instance and share with all components

  const [virtualSpace] = useState(new VirtualSpace(virtual_room_id || "", {}));
  const [socket] = useState(virtualSpace.connect()); // ONLY for listeners, all actions on from class

  useEffect(() => {
    socket.on("updates", (data) => {
      console.log(data);
      //
    });

    return () => {};
  }, [socket]);

  useEffect(() => {
    socket.on("timer", (data) => {
      console.log(data);
      //
    });

    return () => {};
  }, [socket]);

  useEffect(() => {
    socket.on("viewers", (data) => {
      console.log(data);
      //
    });

    return () => {};
  }, [socket]);

  return (
    <VirtualSpaceContext.Provider value={{ socket, virtualSpace }}>
      {
        // All components will use virtual space context to display data
      }
      <button onClick={() => virtualSpace.join()}>Create</button>
    </VirtualSpaceContext.Provider>
  );
}
