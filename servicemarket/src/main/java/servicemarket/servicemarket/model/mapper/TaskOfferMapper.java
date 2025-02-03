package servicemarket.servicemarket.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.TaskOffer;
import servicemarket.servicemarket.model.InputDto.TaskOfferInput;

@Mapper(componentModel = "spring")
public interface TaskOfferMapper {

    TaskOfferMapper INSTANCE = Mappers.getMapper(TaskOfferMapper.class);

    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "images", ignore = true)
    TaskOffer toEntity(TaskOfferInput dto);

    default void updateEntityFromDto(TaskOfferInput dto, @MappingTarget Task task) {

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPrice(dto.getPrice());

        if (task instanceof TaskOffer && dto instanceof TaskOfferInput) {
            ((TaskOffer) task).setExpiryDate(dto.getExpiryDate());
        }
    }

}
