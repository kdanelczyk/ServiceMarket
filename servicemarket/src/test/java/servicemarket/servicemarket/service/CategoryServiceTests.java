package servicemarket.servicemarket.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import servicemarket.servicemarket.model.Category;
import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.TaskOffer;
import servicemarket.servicemarket.model.InputDto.CategoryInput;
import servicemarket.servicemarket.model.mapper.CategoryMapper;
import servicemarket.servicemarket.repository.CategoryRepository;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTests {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private Category category;
    private CategoryInput categoryInput;

    @BeforeEach
    void setUp() {
        category = Category.builder()
                .id("1")
                .name("Test Category")
                .tasks(List.of()) // Pusta lista zadań
                .build();

        categoryInput = CategoryInput.builder()
                .name("Updated Category")
                .build();
    }

    @Test
    void testGetAllCategories() {
        // Given
        Page<Category> categoryPage = new PageImpl<>(List.of(category));
        when(categoryRepository.findAll(PageRequest.of(0, 10))).thenReturn(categoryPage);

        // When
        Page<Category> result = categoryService.getAllCategories(0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(categoryRepository, times(1)).findAll(PageRequest.of(0, 10));
    }

    @Test
    void testGetCategoryById() {
        // Given
        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));

        // When
        Category result = categoryService.getCategoryById("1");

        // Then
        assertNotNull(result);
        assertEquals("1", result.getId());
    }

    @Test
    void testGetCategoryById_NotFound() {
        // Given
        when(categoryRepository.findById("99")).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, () -> categoryService.getCategoryById("99"));
        assertEquals("Category not found", exception.getMessage());
    }

    @Test
    void testCreateCategory() {
        // Given
        when(categoryMapper.toEntity(categoryInput)).thenReturn(category);
        when(categoryRepository.save(category)).thenReturn(category);

        // When
        Category result = categoryService.createCategory(categoryInput);

        // Then
        assertNotNull(result);
        verify(categoryRepository).save(category);
    }

    @Test
    void testUpdateCategory() {
        // Given
        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenAnswer(invocation -> {
            Category savedCategory = invocation.getArgument(0);
            savedCategory.setName("Updated Category");
            return savedCategory;
        });

        // When
        Category result = categoryService.updateCategory("1", categoryInput);

        // Then
        assertNotNull(result);
        assertEquals("Updated Category", result.getName());
        verify(categoryRepository).save(category);
    }

    @Test
    void testUpdateCategory_NotFound() {
        // Given
        when(categoryRepository.findById("99")).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> categoryService.updateCategory("99", categoryInput));
        assertEquals("Task with ID 99 not found", exception.getMessage());
    }

    @Test
    void testAddTask() {
        // Given
        Task task = new TaskOffer();
        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));

        // When
        Task result = categoryService.addTask("1", task);

        // Then
        assertNotNull(result);
        assertEquals(category, task.getCategory());
    }

    @Test
    void testAddTask_CategoryNotFound() {
        // Given
        Task task = new TaskOffer();
        when(categoryRepository.findById("99")).thenReturn(Optional.empty());

        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> categoryService.addTask("99", task));
        assertEquals("Category with id 99 not found", exception.getMessage());
    }

    @Test
    void testDeleteCategory() {
        // Given
        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));

        // When
        categoryService.deleteCategory("1");

        // Then
        verify(categoryRepository).delete(category);
    }

    @Test
    void testDeleteCategory_NotFound() {
        // Given
        when(categoryRepository.findById("99")).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, () -> categoryService.deleteCategory("99"));
        assertEquals("Category not found", exception.getMessage());
    }
}
