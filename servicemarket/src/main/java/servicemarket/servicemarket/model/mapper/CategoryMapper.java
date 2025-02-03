package servicemarket.servicemarket.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import servicemarket.servicemarket.model.Category;
import servicemarket.servicemarket.model.InputDto.CategoryInput;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    Category toEntity(CategoryInput dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    void updateEntityFromDto(CategoryInput dto, @MappingTarget Category category);

}
