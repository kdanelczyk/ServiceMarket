package servicemarket.servicemarket.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import servicemarket.servicemarket.model.Category;
import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.InputDto.CategoryInput;
import servicemarket.servicemarket.model.mapper.CategoryMapper;
import servicemarket.servicemarket.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public Page<Category> getAllCategories(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Category> categories = categoryRepository.findAll(pageable);
        return new PageImpl<>(categories.getContent(), pageable, categories.getTotalElements());
    }

    @Override
    public Category getCategoryById(String id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public Category createCategory(CategoryInput categoryInput) {
        Category category = categoryMapper.toEntity(categoryInput);
        category.setTasks(new ArrayList<>());
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(String id, CategoryInput categoryInput) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with ID " + id + " not found"));
        categoryMapper.updateEntityFromDto(categoryInput, category);
        return categoryRepository.save(category);
    }

    @Override
    public Task addTask(String id, Task task) {
        if (categoryRepository.findById(id).isPresent()) {
            Category category = categoryRepository.findById(id).get();
            List<Task> tasks = new ArrayList<>(category.getTasks());
            tasks.add(task);
            category.setTasks(tasks);
            task.setCategory(category);
            return task;
        } else {
            throw new IllegalArgumentException("Category with id " + id + " not found");
        }
    }

    @Override
    public void deleteCategory(String id) {
        categoryRepository.delete(getCategoryById(id));
    }

}
