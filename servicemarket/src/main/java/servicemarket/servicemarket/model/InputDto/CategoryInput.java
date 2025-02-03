package servicemarket.servicemarket.model.InputDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CategoryInput {

    @NotBlank(message = "Name cannot be empty")
    @Size(max = 50, message = "Name must be 50 characters or less")
    private String name;

}
