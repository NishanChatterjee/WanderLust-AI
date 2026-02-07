package com.wanderlust.payment;

public interface PaymentGateway {
    void charge(String userId, double amount);
}
