"use client";

import { EmptyChatState } from "@/shared/components/empty-state";

export default function HomePage() {
  const handleNewChat = () => {
    // TODO: Implement new chat functionality
    console.log("New chat clicked");
  };

  const handleContacts = () => {
    // TODO: Implement contacts navigation
    console.log("Contacts clicked");
  };

  const handleNewGroup = () => {
    // TODO: Implement new group functionality
    console.log("New group clicked");
  };

  return (
    <EmptyChatState
      onNewChat={handleNewChat}
      onContacts={handleContacts}
      onNewGroup={handleNewGroup}
    />
  );
}
