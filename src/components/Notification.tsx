"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";
import ImageKit from "./ImageKit";

type NotificationType = {
  id: string;
  senderUsername: string;
  type: "like" | "comment" | "rePost" | "follow";
  link: string;
};

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("GET_NOTIFICATION");
    socket.on("GET_NOTIFICATION", (data: NotificationType) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);

  const router = useRouter();

  const reset = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleClick = (notification: NotificationType) => {
    const filteredList = notifications.filter((n) => n.id !== notification.id);
    setNotifications(filteredList);
    setOpen(false);
    router.push(notification.link);
  };
  return (
    <div className="relative mb-2">
      <div
        className="cursor-pointer p-2 rounded-full hover:bg-[#181818] flex items-center gap-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="relative">
          <ImageKit src={`icons/notification.svg`} alt="" w={24} h={24} />
          {notifications.length > 0 && (
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-iconBlue p-2 rounded-full flex items-center justify-center text-sm">
              {notifications.length}
            </div>
          )}
        </div>
        <span className="hidden xxl:inline">Notifications</span>
      </div>
      {open && (
        <div className="absolute -right-full p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-max">
          <h1 className="text-xl text-textGray">Notifications</h1>
          {notifications.map((n) => (
            <div
              className="cursor-pointer flex gap-2"
              key={n.id}
              onClick={() => handleClick(n)}
            >
              <b>{n.senderUsername}</b>{" "}
              {n.type === "like"
                ? "liked your post"
                : n.type === "rePost"
                ? "re-posted your post"
                : n.type === "comment"
                ? "replied your post"
                : "followed you"}
            </div>
          ))}
          {notifications.length ? (
            <button
              onClick={reset}
              className="bg-black text-white p-2 text-sm rounded-lg"
            >
              Mark all as read
            </button>
          ) : (
            <h1 className="text-sm text-textGray">empty</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
