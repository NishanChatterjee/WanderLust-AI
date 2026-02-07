package com.wanderlust.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    private final ChatClient chatClient;

    /**
     * EXT: END-TO-END FLOW - AI & RAG
     * This controller handles the chat interactions. It uses Spring AI to retrieve
     * documents from the Vector Store (PGVector) and augment the prompt (RAG).
     */
    public AssistantController(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder
                // FLOW: System Prompt for Generative UI
                // We instruct the AI to output specific JSON when a booking intent is found.
                // The frontend detects this JSON to show the "Book Now" button.
                .defaultSystem("You are WanderLust AI, a helpful travel concierge. " +
                        "If you find a suitable flight and hotel option for the user, or if the user asks to book something specific, "
                        +
                        "ALWAYS output a JSON block at the end of your response in this exact format: " +
                        "{\"flightId\": \"F123\", \"hotelId\": \"H456\", \"amount\": 1200.0, \"destination\": \"Paris\"}. "
                        +
                        "Do not use markdown code blocks for the JSON, just raw JSON text at the end.")

                // FLOW: RAG Advisor
                // This automatically looks up relevant docs in the vector store and adds them
                // to context.
                .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults()))
                .build();
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String userQuery) {
        // FLOW: Call the LLM
        return chatClient.prompt()
                .user(userQuery)
                .call()
                .content();
    }
}
