package servicemarket.servicemarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import servicemarket.servicemarket.model.Category;
import servicemarket.servicemarket.model.InputDto.CategoryInput;
import servicemarket.servicemarket.service.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = { "http://localhost:80", "http://frontendservice:80", "http://frontendservice:3000",
        "http://frontendservice:30000" })
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/page")
    public ResponseEntity<PageImpl<Category>> getCategories(
            @RequestParam int page,
            @RequestParam int size) {
        Page<Category> categories = categoryService.getAllCategories(page, size);
        return ResponseEntity
                .ok(new PageImpl<>(categories.getContent(), categories.getPageable(), categories.getTotalElements()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CategoryInput categoryInput) {
        return ResponseEntity.ok(categoryService.createCategory(categoryInput));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Category> updateCategory(
            @PathVariable String id,
            @Valid @RequestBody CategoryInput categoryInput) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryInput));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

}
