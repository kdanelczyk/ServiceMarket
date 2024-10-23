package com.servicemarket.servicemarket.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.servicemarket.servicemarket.model.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByTitleContaining(String title);
    List<Task> findByCreatedBy(String createdBy);
}
