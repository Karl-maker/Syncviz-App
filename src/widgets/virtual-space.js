import { useState, createContext, useEffect } from "react";
import VirtualSpace from "../classes/virtual-space";
import ManageVirtualSpace from "../components/manage-virtual-space";
import VirtualSpaceComponent from "../components/virtual-space";

export const VirtualSpaceContext = createContext({});

export default function VirtualSpaceWidget({
  virtual_room_id,
  manage,
  attributes,
}) {
  // This will create instance and share with all components

  const [virtualSpace] = useState(
    new VirtualSpace(virtual_room_id || null, attributes || {})
  );
  const [socket] = useState(virtualSpace.connect()); // ONLY for listeners, all actions on from class

  useEffect(() => {
    socket.on("connect", () => {
      if (!manage) {
        virtualSpace.join();
      } else {
        virtualSpace.create();
      }
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // Join as soon as rendered

  return (
    <VirtualSpaceContext.Provider value={{ socket, virtualSpace }}>
      {
        // All components will use virtual space context to display data
      }
      {manage && <ManageVirtualSpace />}
      <VirtualSpaceComponent />
    </VirtualSpaceContext.Provider>
  );
}
