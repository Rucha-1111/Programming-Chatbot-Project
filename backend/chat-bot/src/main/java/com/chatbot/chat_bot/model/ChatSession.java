package com.chatbot.chat_bot.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chat_sessions")
public class ChatSession {
    @Id
    private String id;
    private String userMessage;
    private String botResponse;
    private LocalDateTime timestamp;

    public String getId() {
        return id;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public String getBotResponse() {
        return botResponse;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setId (String id) {
        this.id = id;
    }

    public void setUserMessage (String userMessage) {
        this.userMessage = userMessage;
    }

    public void setBotResponse (String botResponse) {
        this.botResponse = botResponse;
    }

    public void setTimestamp (LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
