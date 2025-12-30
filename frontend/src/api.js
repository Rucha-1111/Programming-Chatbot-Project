const API_URL = "http://localhost:8080/api/chat";

export const sendMessageToBot = async (message) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.text();
    } catch (error) {
        console.error("Error calling ChatBot API:", error);
        return "I'm having trouble connecting to the server. Please make sure the backend is running!";
    }
};

export const fetchChatHistory = async () => {
    try {
        const response = await fetch(`${API_URL}/history`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const sessions = await response.json();
        return sessions.map(session => ({
            id: session.sessionId,
            title: session.messages.length > 0 ? session.messages[0].userMessage : 'Empty Session',
            timestamp: session.messages.length > 0 ? session.messages[session.messages.length - 1].timestamp : new Date().toISOString()
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
        console.error("Error fetching chat history:", error);
        return [];
    }
};

export const fetchSessionHistory = async (sessionId) => {
    try {
        const response = await fetch(`${API_URL}/sessions/${sessionId}/messages`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching session history:", error);
        return [];
    }
};

export const createNewSession = async (sessionId) => {
    try {
        const response = await fetch(`${API_URL}/sessions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating new session:", error);
        return null;
    }
};
