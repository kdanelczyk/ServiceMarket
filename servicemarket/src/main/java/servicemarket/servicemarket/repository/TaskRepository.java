package servicemarket.servicemarket.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import servicemarket.servicemarket.model.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

    @SuppressWarnings("null")
    Page<Task> findAll(Pageable pageable);

    Page<Task> findByCategoryId(String categoryId, Pageable pageable);

}