package servicemarket.servicemarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.TaskOffer;
import servicemarket.servicemarket.model.TaskRequest;
import servicemarket.servicemarket.model.InputDto.TaskOfferInput;
import servicemarket.servicemarket.model.InputDto.TaskRequestInput;
import servicemarket.servicemarket.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = { "http://localhost:80", "http://frontend-service:80", "http://localhost:3000", })
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/offers/page")
    public ResponseEntity<PageImpl<TaskOffer>> getAllTaskOffers(
            @RequestParam int page,
            @RequestParam int size) {
        Page<TaskOffer> taskOffers = taskService.getAllTasksOffers(page, size);
        return ResponseEntity
                .ok(new PageImpl<>(taskOffers.getContent(), taskOffers.getPageable(), taskOffers.getTotalElements()));
    }

    @GetMapping("/requests/page")
    public ResponseEntity<PageImpl<TaskRequest>> getAllTaskRequests(
            @RequestParam int page,
            @RequestParam int size) {
        Page<TaskRequest> taskRequests = taskService.getAllTasksRequests(page, size);
        return ResponseEntity.ok(
                new PageImpl<>(taskRequests.getContent(), taskRequests.getPageable(), taskRequests.getTotalElements()));
    }

    @GetMapping("/requests/category/{categoryId}/page")
    public ResponseEntity<PageImpl<TaskRequest>> getTaskRequestsByCategoryId(
            @PathVariable String categoryId,
            @RequestParam int page,
            @RequestParam int size) {
        Page<TaskRequest> taskRequests = taskService.getTaskRequestsByCategoryId(categoryId, page, size);
        return ResponseEntity.ok(
                new PageImpl<>(taskRequests.getContent(), taskRequests.getPageable(), taskRequests.getTotalElements()));
    }

    @GetMapping("/offers/category/{categoryId}/page")
    public ResponseEntity<PageImpl<TaskOffer>> getTaskOffersByCategoryId(
            @PathVariable String categoryId,
            @RequestParam int page,
            @RequestParam int size) {
        Page<TaskOffer> taskOffers = taskService.getTaskOffersByCategoryId(categoryId, page, size);
        return ResponseEntity
                .ok(new PageImpl<>(taskOffers.getContent(), taskOffers.getPageable(), taskOffers.getTotalElements()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @GetMapping("/info/loggedIn/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Task> getInfoAbout(@PathVariable String id) {
        taskService.getInfoAboutIfLoggedIn(id);
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @GetMapping("/info/notLoggedIn/{id}")
    public ResponseEntity<Task> getInfoAbout(
            @PathVariable String id,
            @RequestParam String name,
            @RequestParam String email) {
        taskService.getInfoAboutIfNotLoggedIn(id, name, email);
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping("/requests/category/{categoryId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Task> createTaskRequest(@PathVariable String categoryId,
            @Valid @ModelAttribute TaskRequestInput taskRequestInput) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.createTaskRequest(taskRequestInput, categoryId));
    }

    @PostMapping("/offers/category/{categoryId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Task> createTaskOffer(@PathVariable String categoryId,
            @Valid @ModelAttribute TaskOfferInput taskOfferInput) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTaskOffer(taskOfferInput, categoryId));
    }

    @PutMapping("/requests/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Task> updateTaskRequest(@PathVariable String id,
            @Valid @ModelAttribute TaskRequestInput taskRequestInput) {
        return ResponseEntity.ok(taskService.updateTask(id, taskRequestInput));
    }

    @PutMapping("/offers/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Task> updateTaskOffer(@PathVariable String id,
            @Valid @ModelAttribute TaskOfferInput taskOfferInput) {
        return ResponseEntity.ok(taskService.updateTask(id, taskOfferInput));
    }

    @GetMapping("/image/{taskId}/{index}")
    public ResponseEntity<byte[]> getImage(
            @PathVariable String taskId,
            @PathVariable int index) {
        try {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(taskService.getTaskImage(taskId, index));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

}
