package servicemarket.servicemarket.model.InputDto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class TaskRequestInput extends TaskInput {

    @NotBlank(message = "Location cannot be empty")
    @Size(max = 100, message = "Location must be 100 characters or less")
    private String location;

    @NotNull(message = "Deadline cannot be null")
    @Future(message = "Deadline must be in the future")
    private LocalDateTime deadline;

}
