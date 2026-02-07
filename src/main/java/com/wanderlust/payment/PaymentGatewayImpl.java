package com.wanderlust.payment;

import org.springframework.stereotype.Component;

@Component
class PaymentGatewayImpl implements PaymentGateway {

    /**
     * EXT: END-TO-END FLOW - STEP 2c (Backend)
     * Charging the user's card.
     */
    @Override
    public void charge(String userId, double amount) {
        // Validation: Cannot charge negative/zero amount
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        // FLOW: Simulate Network Latency (500ms)
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // FLOW: Failure Simulation & Business Rules

        // 1. Logic: Insufficient Funds Simulation
        // For testing the Saga Rollback mechanism, we simulate a failure if the amount
        // is too high.
        // This allows developers to see the 'Hotel' and 'Flight' reservations get
        // CANCELLED automatically.
        if (amount > 10000) {
            System.out.println("❌ Payment rejected for user " + userId + ": Insufficient funds for amount " + amount);
            throw new PaymentFailedException();
        }

        // 2. Logic: Blacklisted/Fraudulent User Simulation
        // Consistent with other gateways, if userId starts with 'FAIL', we reject
        // payment.
        if (userId.toUpperCase().startsWith("FAIL")) {
            System.out.println("❌ Payment blocked for user " + userId + ": Risk check failed.");
            throw new PaymentFailedException();
        }

        // FLOW: Success
        System.out.println("💰 Charged user " + userId + " amount $" + amount);
    }
}
