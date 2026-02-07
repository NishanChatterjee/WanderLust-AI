package com.wanderlust.payment;

public class PaymentFailedException extends RuntimeException {
    public PaymentFailedException() {
        super("Payment failed due to insufficient funds or error.");
    }
}
