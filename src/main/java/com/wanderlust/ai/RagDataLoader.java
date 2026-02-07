package com.wanderlust.ai;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class RagDataLoader implements CommandLineRunner {

        private final VectorStore vectorStore;

        public RagDataLoader(VectorStore vectorStore) {
                this.vectorStore = vectorStore;
        }

        /**
         * EXT: STARTUP LOGIC (RAG)
         * Loads sample documents into the PGVector database on startup.
         * This ensures the AI has knowledge to answer user queries immediately.
         */
        @Override
        public void run(String... args) throws Exception {
                System.out.println("📄 Loading Travel Policy Documents into Vector Store for RAG...");

                List<Document> documents = List.of(
                                new Document(
                                                "WanderLust Cancellation Policy: Flights are 100% refundable if cancelled 24h before departure. Hotels are non-refundable unless 'Flex' option is chosen.",
                                                Map.of("type", "policy")),
                                new Document(
                                                "Baggage Allowance: Economy class passengers are allowed 1 carry-on (7kg) and 2 checked bags (23kg each). Business class gets double.",
                                                Map.of("type", "policy")),
                                new Document(
                                                "Visa Requirements: Use our Visa Concierge tool to check requirements for Paris (Schengen) and Tokyo (Japan).",
                                                Map.of("type", "info")),
                                new Document("Payment Options: We accept Visa, Mastercard, and WanderPoints. Crypto is coming soon.",
                                                Map.of("type", "policy")),
                                // Add a document that triggers the Generative UI in our demo
                                new Document(
                                                "Special Offer: Book a trip to Paris with Flight F123 and Hotel H456 for a special price of $1200.",
                                                Map.of("type", "promotion")));

                try {
                        // FLOW: Embed and Store
                        // Spring AI converts these text docs into vectors and saves them in Postgres.
                        vectorStore.add(documents);
                        System.out.println("✅ Documents loaded successfully into PGVector.");
                } catch (Exception e) {
                        System.out.println(
                                        "⚠️ Warning: Could not load documents to Vector Store. Is Postgres (pgvector) running? "
                                                        + e.getMessage());
                }
        }
}
