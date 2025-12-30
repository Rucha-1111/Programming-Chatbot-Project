package com.chatbot.chat_bot.service;

import java.io.InputStream;
import java.util.List;

import org.springframework.stereotype.Service;

import com.chatbot.chat_bot.model.KnowledgeBaseEntry;
import com.chatbot.chat_bot.nlp.NLPProcessor;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class ChatService {
    private List<KnowledgeBaseEntry> knowledgeBase;
    private final NLPProcessor nlpProcessor = new NLPProcessor();

    @PostConstruct
    public void loadKnowledgeBase() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getResourceAsStream("/knowledge_base.json");
        knowledgeBase = List.of(mapper.readValue(is, KnowledgeBaseEntry[].class));
    }

    public String getResponse(String message) {
        return nlpProcessor.findBestAnswer(message, knowledgeBase);
    }
}
