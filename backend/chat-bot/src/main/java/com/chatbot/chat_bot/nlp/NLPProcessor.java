package com.chatbot.chat_bot.nlp;

import java.util.List;

import com.chatbot.chat_bot.model.KnowledgeBaseEntry;

public class NLPProcessor {
    public String findBestAnswer(String userMessage, List<KnowledgeBaseEntry> knowledgeBase) {
        userMessage = userMessage.toLowerCase();

        for (KnowledgeBaseEntry entry : knowledgeBase) {
            for (String keyword : entry.getKeywords()) {
                if (userMessage.contains(keyword.toLowerCase())) {
                    return entry.getAnswer();
                }
            }
        }
        return "Sorry, I don't know the answer yet.";
    }
}
