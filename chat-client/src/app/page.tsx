import { CreateRoomForm } from "@/components/CreateRoomForm";
import { MessagesList } from "@/components/MessagesListComponent";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col p-6 items-center gap-3">
      <h1 className="font-bold text-2xl">Chat Room</h1>
      <CreateRoomForm />
      <MessagesList />
    </div>
  );
}
