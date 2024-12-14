"use client";

import { useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

export const CreateRoomForm = () => {
  const [roomIdInput, setRoomIdInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const createRoom = () => {
    router.push(`/?roomId=${roomIdInput}&name=${nameInput}`);
    setRoomIdInput("");
  };

  if (roomId) return null;

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
        placeholder="Digite o nome da sala"
        value={roomIdInput}
        onChange={(e) => setRoomIdInput(e.target.value)}
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
