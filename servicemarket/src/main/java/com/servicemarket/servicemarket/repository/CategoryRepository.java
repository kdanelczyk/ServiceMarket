package com.servicemarket.servicemarket.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.servicemarket.servicemarket.model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    List<Category> findByName(String name);
}
