package servicemarket.servicemarket.dataSeeder;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.lang.NonNull;

import servicemarket.servicemarket.model.Category;
import servicemarket.servicemarket.repository.CategoryRepository;

@Configuration
public class CategorySeeder implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void onApplicationEvent(@NonNull ContextRefreshedEvent event) {
        categoryRepository.deleteAll();
        List<Category> categories = List.of(
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Carpentry")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Gardening")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Construction")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Mechanics")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Tailoring")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Electrical Work")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Photography")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Plumbing")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Transportation")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Cosmetology")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Painting")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Gastronomy")
                        .tasks(List.of())
                        .build(),
                Category.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Translation Services")
                        .tasks(List.of())
                        .build());

        categoryRepository.saveAll(categories);

        System.out.println("Categories have been seeded:");
        categories.forEach(System.out::println);
    }
}
