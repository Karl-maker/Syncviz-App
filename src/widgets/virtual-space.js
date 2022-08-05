import { createContext, useEffect } from "react";
import ManageVirtualSpace from "../components/manage-virtual-space";
import VirtualSpaceComponent from "../components/virtual-space";

export const VirtualSpaceContext = createContext({});

export default function VirtualSpaceWidget({ manage, socket, virtualSpace }) {
  // This will create instance and share with all components

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
  }, []);

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
