package servicemarket.servicemarket.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import servicemarket.servicemarket.model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    Category findByName(String name);

    @SuppressWarnings("null")
    Page<Category> findAll(Pageable pageable);

}
