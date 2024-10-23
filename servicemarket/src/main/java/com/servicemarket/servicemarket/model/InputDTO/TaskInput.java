package com.servicemarket.servicemarket.model.InputDTO;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public abstract class TaskInput {

    @NotBlank(message = "Created By cannot be empty")
    private String createdBy;

    @NotBlank(message = "Title cannot be empty")
    @Size(max = 50, message = "Title must be 50 characters or less")
    private String title;

    @NotBlank(message = "Description cannot be empty")
    @Size(max = 300, message = "Description must be 300 characters or less")
    private String description;

    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;

    private List<byte[]> images;

}
