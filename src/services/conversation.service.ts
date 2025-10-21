async function fetchConversations() {
  const response = await fetch("/api/conversations");
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  return response.json();
}

const ConversationService = {
  fetchConversations,
};

export default ConversationService;
