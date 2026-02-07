package com.wanderlust.shared;

/**
 * SHARED ENUM: Status
 * Represents the final state of an external service transaction.
 * 
 * <p>
 * Used by Gateways to signal the Saga Orchestrator.
 * </p>
 */
public enum Status {
    /** The external service confirmed the reservation. */
    SUCCESS,

    /** The external service rejected the reservation (e.g. Sold Out, Error). */
    FAILED;

    /**
     * @return true if this status represents a successful operation.
     */
    public boolean isSuccess() {
        return this == SUCCESS;
    }
}
