package servicemarket.servicemarket.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

import servicemarket.servicemarket.model.TaskOffer;
import servicemarket.servicemarket.model.TaskRequest;
import servicemarket.servicemarket.model.InputDto.TaskOfferInput;
import servicemarket.servicemarket.model.InputDto.TaskRequestInput;
import servicemarket.servicemarket.service.TaskService;

@ExtendWith(MockitoExtension.class)
class TaskControllerTests {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @Autowired
    private MockMvc mockMvc;

    private TaskOffer taskOffer;
    private TaskRequest taskRequest;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(taskController)
                .setMessageConverters(new MappingJackson2HttpMessageConverter())
                .build();

        taskOffer = TaskOffer.builder()
                .id("1")
                .title("Test Task Offer")
                .description("The kitchen sink")
                .price(new BigDecimal("3020.00"))
                .expiryDate(LocalDateTime.parse("2025-01-20T10:00:00"))
                .build();

        taskRequest = TaskRequest.builder()
                .id("2")
                .title("Test Task Request")
                .description("The kitchen sink")
                .price(new BigDecimal("3020.00"))
                .location("Warsaw, street13")
                .deadline(LocalDateTime.parse("2025-01-20T10:00:00"))
                .build();

    }

    @Test
    void shouldReturnAllTaskOffers() throws Exception {
        // Given
        PageImpl<TaskOffer> page = new PageImpl<>(Collections.singletonList(taskOffer), PageRequest.of(0, 10),
                1);
        when(taskService.getAllTasksOffers(0, 10)).thenReturn(page);

        // When & Then
        mockMvc.perform(get("/tasks/offers/page")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value("1"))
                .andExpect(jsonPath("$.content[0].title").value("Test Task Offer"));
    }

    @Test
    void shouldReturnAllTaskRequests() throws Exception {
        // Given
        PageImpl<TaskRequest> page = new PageImpl<>(Collections.singletonList(taskRequest),
                PageRequest.of(0, 10), 1);
        when(taskService.getAllTasksRequests(0, 10)).thenReturn(page);

        // When & Then
        mockMvc.perform(get("/tasks/requests/page")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value("2"))
                .andExpect(jsonPath("$.content[0].title").value("Test Task Request"));
    }

    @Test
    void shouldReturnTaskOfferByCategoryId() throws Exception {
        // Given
        PageImpl<TaskOffer> page = new PageImpl<>(Collections.singletonList(taskOffer), PageRequest.of(0, 10),
                1);
        when(taskService.getTaskOffersByCategoryId("123", 0, 10)).thenReturn(page);

        // When & Then
        mockMvc.perform(get("/tasks/offers/category/{categoryId}/page", "123")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value("1"))
                .andExpect(jsonPath("$.content[0].title").value("Test Task Offer"));
    }

    @Test
    void shouldReturnTaskRequestByCategoryId() throws Exception {
        // Given
        PageImpl<TaskRequest> page = new PageImpl<>(Collections.singletonList(taskRequest),
                PageRequest.of(0, 10), 1);
        when(taskService.getTaskRequestsByCategoryId("123", 0, 10)).thenReturn(page);

        // When & Then
        mockMvc.perform(get("/tasks/requests/category/{categoryId}/page", "123")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value("2"))
                .andExpect(jsonPath("$.content[0].title").value("Test Task Request"));
    }

    @Test
    void shouldReturnTaskById() throws Exception {
        // Given
        when(taskService.getTaskById("1")).thenReturn(taskOffer);

        // When & Then
        mockMvc.perform(get("/tasks/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.title").value("Test Task Offer"));
    }

    @Test
    void shouldCreateTaskRequest() throws Exception {
        // Given
        when(taskService.createTaskRequest(any(TaskRequestInput.class), eq("123"))).thenReturn(taskRequest);

        // When & Then
        mockMvc.perform(post("/tasks/requests/category/{categoryId}", "123")
                .contentType("application/x-www-form-urlencoded")
                .param("title", "Test Task Request")
                .param("description", "A sample task request")
                .param("location", "Test Location")
                .param("price", "100.50")
                .param("deadline", "2025-12-31T23:59:59"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("2"))
                .andExpect(jsonPath("$.title").value("Test Task Request"));
    }

    @Test
    void shouldCreateTaskOffer() throws Exception {
        // Given
        when(taskService.createTaskOffer(any(TaskOfferInput.class), eq("123"))).thenReturn(taskOffer);

        // When & Then
        mockMvc.perform(post("/tasks/offers/category/{categoryId}", "123")
                .contentType("application/x-www-form-urlencoded")
                .param("title", "Test Task Offer")
                .param("description", "A sample task offer")
                .param("price", "200.75")
                .param("expiryDate", "2025-12-31T23:59:59"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.title").value("Test Task Offer"));
    }

    @Test
    void shouldUpdateTaskRequest() throws Exception {
        // Given
        TaskRequest updatedTaskRequest = new TaskRequest();
        updatedTaskRequest.setId("2");
        updatedTaskRequest.setTitle("Updated Task Request");

        when(taskService.updateTask(eq("2"), any(TaskRequestInput.class))).thenReturn(updatedTaskRequest);

        // When & Then
        mockMvc.perform(put("/tasks/requests/{id}", "2")
                .contentType("application/x-www-form-urlencoded")
                .param("title", "Updated Task Request")
                .param("description", "Updated description")
                .param("location", "Updated Location")
                .param("price", "150.75")
                .param("deadline", "2025-12-31T23:59:59"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("2"))
                .andExpect(jsonPath("$.title").value("Updated Task Request"));
    }

    @Test
    void shouldUpdateTaskOffer() throws Exception {
        // Given
        TaskOffer updatedTaskOffer = new TaskOffer();
        updatedTaskOffer.setId("1");
        updatedTaskOffer.setTitle("Updated Task Offer");

        when(taskService.updateTask(eq("1"), any(TaskOfferInput.class))).thenReturn(updatedTaskOffer);

        // When & Then
        mockMvc.perform(put("/tasks/offers/{id}", "1")
                .contentType("application/x-www-form-urlencoded")
                .param("title", "Updated Task Offer")
                .param("description", "Updated offer description")
                .param("price", "250.00")
                .param("expiryDate", "2025-12-31T23:59:59"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.title").value("Updated Task Offer"));
    }

    @Test
    void shouldDeleteTask() throws Exception {
        // Given
        doNothing().when(taskService).deleteTask("1");

        // When & Then
        mockMvc.perform(delete("/tasks/{id}", "1"))
                .andExpect(status().isNoContent());
    }

}
