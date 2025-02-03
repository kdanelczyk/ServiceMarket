package servicemarket.servicemarket.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "tasks")
public abstract class Task {

    @Id
    private String id;
    private String createdBy;
    private String title;
    private String description;
    private BigDecimal price;
    private LocalDateTime createdAt;
    private List<Binary> images;

    @DBRef
    private Category category;

}
