"use client";

import { useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

export const CreateRoomForm = () => {
  const [senderIdInput, setSenderIdInput] = useState("");
  const [receiverIdInput, setReceiverIdInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const senderId = searchParams.get("senderId");

  const createRoom = () => {
    router.push(
      `/?senderId=${senderIdInput}&receiverId=${receiverIdInput}&name=${nameInput}`
    );
    setSenderIdInput("");
    setReceiverIdInput("");
  };

  if (senderId || receiverId) return null;

  return (
    <>
      <input
        type="text"
        placeholder="Digite o seu nome"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        className="max-w-80 rounded-md bg-slate-300 p-2 placeholder-slate-400 text-gray-700"
      />
      <input
        type="text"
        placeholder="Digite o seu email"
        value={senderIdInput}
        onChange={(e) => setSenderIdInput(e.target.value)}
        className="max-w-80 rounded-md bg-slate-300 p-2 placeholder-slate-400 text-gray-700"
      />

      <input
        type="text"
        placeholder="Digite o email de quem vai receber"
        value={receiverIdInput}
        onChange={(e) => setReceiverIdInput(e.target.value)}
        className="max-w-80 rounded-md bg-slate-300 p-2 placeholder-slate-400 text-gray-700"
      />
      <button
        onClick={createRoom}
        className="min-w-24 p-3 rounded-md bg-blue-950 text-white font-bold "
      >
        Criar sala
      </button>
    </>
  );
};
