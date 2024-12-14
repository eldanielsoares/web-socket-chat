"use client";
import { socket } from "@/services/socket";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Messages = {
  message: string;
  name: string;
};

export const MessagesList = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const nameInput = searchParams.get("name");

  const sendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit(`server:message`, {
        message: inputMessage,
        name: nameInput,
        roomId,
      });
      setInputMessage("");
    }
  };

  useEffect(() => {
    socket.disconnected ? socket.connect() : socket.offAny();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on(`client:message/${roomId}`, (payload: Messages) => {
      setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  if (!roomId) return null;

  return (
    <>
      <div className="w-full max-w-3xl h-full rounded-md p-4 border-blue-600 border-solid border flex flex-col">
        <div className="w-full flex-grow p-2 flex flex-col overflow-y-auto">
          {messages?.map((data: Messages, index: number) => (
            <div
              key={index}
              className={`bg-slate-300 my-2 min-h-8 w-fit px-4 rounded-md flex items-center ${
                data.name === nameInput ? "self-end" : "self-start"
              }`}
            >
              <span>{data.message}</span>
            </div>
          ))}
        </div>
        <div className="h-12 w-full flex">
          <input
            type="text"
            placeholder="Digite sua mensagem"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 h-full rounded-md bg-slate-300 p-2 placeholder-slate-400 text-gray-700"
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded-md bg-blue-950 text-white font-bold "
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};
