package com.chatbot.chat_bot.nlp;

import java.util.List;
import java.util.regex.Pattern;
import com.chatbot.chat_bot.model.KnowledgeBaseEntry;

public class NLPProcessor {
    public String findBestAnswer(String userMessage, List<KnowledgeBaseEntry> knowledgeBase) {
        // Clean and normalize input
        String normalizedInput = userMessage.toLowerCase().trim();

        KnowledgeBaseEntry bestMatch = null;
        double maxScore = 0.0;

        for (KnowledgeBaseEntry entry : knowledgeBase) {
            double currentEntryScore = 0.0;

            for (String keyword : entry.getKeywords()) {
                String lowerKeyword = keyword.toLowerCase().trim();

                // 1. Check for Exact Phrase Match (Highest Priority)
                if (normalizedInput.equals(lowerKeyword)) {
                    currentEntryScore += 100.0;
                }
                // 2. Check for Whole Word Match using Regex (Prevents "c" matching "deadlock")
                // \b creates a word boundary
                else if (Pattern.compile("\\b" + Pattern.quote(lowerKeyword) + "\\b").matcher(normalizedInput).find()) {
                    currentEntryScore += (lowerKeyword.length() * 2); // Weight by length
                }
            }

            if (currentEntryScore > maxScore) {
                maxScore = currentEntryScore;
                bestMatch = entry;
            }
        }

        // Only return if the score is high enough to be confident
        if (bestMatch != null && maxScore > 0) {
            return bestMatch.getAnswer();
        }
        return "Sorry, I don't know the answer yet.";
    }
}