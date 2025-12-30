package com.chatbot.chat_bot.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chatbot.chat_bot.model.ChatSession;

public interface ChatSessionRepository extends MongoRepository <ChatSession, String> {

}
