package servicemarket.servicemarket.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import servicemarket.servicemarket.model.Category;
import servicemarket.servicemarket.model.InputDto.CategoryInput;
import servicemarket.servicemarket.service.CategoryService;

@ExtendWith(MockitoExtension.class)
class CategoryControllerTests {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @Autowired
    private MockMvc mockMvc;

    private Category category;

    @BeforeEach
    void setUp() {

        mockMvc = MockMvcBuilders
                .standaloneSetup(categoryController)
                .setMessageConverters(new MappingJackson2HttpMessageConverter())
                .build();

        category = Category.builder()
                .id("1")
                .name("Test Category")
                .tasks(new ArrayList<>())
                .build();
    }

    @Test
    void shouldReturnCategories() throws Exception {
        // Given
        PageImpl<Category> page = new PageImpl<>(Collections.singletonList(category), PageRequest.of(0, 16), 1);
        when(categoryService.getAllCategories(0, 16)).thenReturn(page);

        // When & Then
        mockMvc.perform(get("/categories/page")
                .param("page", "0")
                .param("size", "16"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value("1"))
                .andExpect(jsonPath("$.content[0].name").value("Test Category"));
    }

    @Test
    void shouldReturnCategoryById() throws Exception {
        // Given
        when(categoryService.getCategoryById("1")).thenReturn(category);

        // When & Then
        mockMvc.perform(get("/categories/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Test Category"));
    }

    @Test
    void shouldCreateCategory() throws Exception {
        // Given
        when(categoryService.createCategory(any(CategoryInput.class))).thenReturn(category);

        // When & Then
        mockMvc.perform(post("/categories")
                .contentType("application/json")
                .content("{\"name\":\"Test Category\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Test Category"));
    }

    @Test
    void shouldUpdateCategory() throws Exception {
        // Given
        Category updatedCategory = new Category();
        updatedCategory.setId("1");
        updatedCategory.setName("Updated Category");

        when(categoryService.updateCategory(eq("1"), any(CategoryInput.class))).thenReturn(updatedCategory);

        // When & Then
        mockMvc.perform(put("/categories/{id}", "1")
                .contentType("application/json")
                .content("{\"name\":\"Updated Category\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Updated Category"));
    }

    @Test
    void shouldDeleteCategory() throws Exception {
        // Given
        doNothing().when(categoryService).deleteCategory("1");

        // When & Then
        mockMvc.perform(delete("/categories/{id}", "1"))
                .andExpect(status().isNoContent());
    }
}
