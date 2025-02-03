package servicemarket.servicemarket.service;

import org.springframework.data.domain.Page;

import servicemarket.servicemarket.model.Category;
import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.InputDto.CategoryInput;

public interface CategoryService {

    public Page<Category> getAllCategories(int page, int size);

    public Category getCategoryById(String id);

    public Category getCategoryByName(String name);

    public Category createCategory(CategoryInput categoryInput);

    public Category updateCategory(String id, CategoryInput categoryInput);

    public Task addTask(String id, Task task);

    public void deleteCategory(String id);

}
