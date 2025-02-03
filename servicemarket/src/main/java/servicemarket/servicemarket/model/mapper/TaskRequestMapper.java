package servicemarket.servicemarket.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.TaskRequest;
import servicemarket.servicemarket.model.InputDto.TaskRequestInput;

@Mapper(componentModel = "spring")
public interface TaskRequestMapper {

    TaskRequestMapper INSTANCE = Mappers.getMapper(TaskRequestMapper.class);

    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "images", ignore = true)
    TaskRequest toEntity(TaskRequestInput dto);

    default void updateEntityFromDto(TaskRequestInput dto, @MappingTarget Task task) {
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPrice(dto.getPrice());

        if (task instanceof TaskRequest && dto instanceof TaskRequestInput) {
            ((TaskRequest) task).setLocation(dto.getLocation());
            ((TaskRequest) task).setDeadline(dto.getDeadline());
        }
    }
}
