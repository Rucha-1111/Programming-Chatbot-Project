package com.chatbot.chat_bot.service;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.chatbot.chat_bot.model.ChatSession;
import com.chatbot.chat_bot.model.KnowledgeBaseEntry;
import com.chatbot.chat_bot.nlp.NLPProcessor;
import com.chatbot.chat_bot.repository.ChatSessionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class ChatService {
    private final ChatSessionRepository repository;
    private List<KnowledgeBaseEntry> knowledgeBase;
    private final NLPProcessor nlpProcessor = new NLPProcessor();

    public ChatService(ChatSessionRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void loadKnowledgeBase() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getResourceAsStream("/knowledge_base.json");
        knowledgeBase = List.of(mapper.readValue(is, KnowledgeBaseEntry[].class));
    }

    public String getResponse(String message) {
        String answer = nlpProcessor.findBestAnswer(message, knowledgeBase);

        ChatSession session = new ChatSession();
        session.setUserMessage(message);
        session.setBotResponse(answer);
        session.setTimestamp(LocalDateTime.now());

        repository.save(session);

        return answer;
    }
}
