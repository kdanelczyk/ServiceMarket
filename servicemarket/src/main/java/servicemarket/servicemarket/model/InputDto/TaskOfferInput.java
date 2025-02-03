package servicemarket.servicemarket.model.InputDto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
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
public class TaskOfferInput extends TaskInput {

    @NotNull(message = "Expiry date cannot be null")
    @FutureOrPresent(message = "Expiry date must be today or in the future")
    private LocalDateTime expiryDate;

}
