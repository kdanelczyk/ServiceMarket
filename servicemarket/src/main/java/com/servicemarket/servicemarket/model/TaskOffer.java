package com.servicemarket.servicemarket.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TaskOffer extends Task {

    @NotNull(message = "Expiry date cannot be null")
    @FutureOrPresent(message = "Expiry date must be today or in the future")
    private LocalDateTime expiryDate;
}
