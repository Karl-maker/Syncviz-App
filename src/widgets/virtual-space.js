import { useState, createContext } from "react";
import VirtualSpace from "../classes/virtual-space";
import VirtualSpaceComponent from "../components/virtual-space";

export const VirtualSpaceContext = createContext({});

export default function VirtualSpaceWidget({ virtual_room_id }) {
  // This will create instance and share with all components

  const [virtualSpace] = useState(new VirtualSpace(virtual_room_id || "", {}));
  const [socket] = useState(virtualSpace.connect()); // ONLY for listeners, all actions on from class

  // Join as soon as rendered

  return (
    <VirtualSpaceContext.Provider value={{ socket, virtualSpace }}>
      {
        // All components will use virtual space context to display data
      }
      <VirtualSpaceComponent />
    </VirtualSpaceContext.Provider>
  );
}
