package com.servicemarket.servicemarket.model.InputDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryInput {

    @NotBlank(message = "Name cannot be empty")
    @Size(max = 50, message = "Name must be 50 characters or less")
    private String name;
    
}
