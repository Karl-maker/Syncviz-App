import ChatRoomComponent from "./chat-room";
import Timer from "./timer";

export default function Viewer() {
  return (
    <div
      style={{
        position: "relative",
        padding: 0,
      }}
    >
      <div
        style={{
          borderRadius: "30px",
          height: "70vh",
          backgroundColor: "transparent",
          // /opacity: 0.2,
        }}
      >
        {
          // 3D View
        }
      </div>
      {
        // Overlay Content
      }
      {
        // Timer
      }
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: "0%",
          right: "0%",
          marginRight: "20px",
          marginTop: "10px",
        }}
      >
        <Timer />
      </div>
      {
        // Message
      }

      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: "0%",
          left: "0%",
          marginLeft: "25px",
          height: "100%",
          width: "50%",
        }}
      >
        <ChatRoomComponent />
      </div>
      {
        // Fullscreen
      }
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          bottom: "0%",
          left: "0%",
          marginLeft: "15px",
          marginBottom: "15px",
        }}
      ></div>
    </div>
  );
}
