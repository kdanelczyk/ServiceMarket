package servicemarket.servicemarket.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import servicemarket.servicemarket.converter.ImagesConverter;
import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.TaskOffer;
import servicemarket.servicemarket.model.TaskRequest;
import servicemarket.servicemarket.model.InputDto.TaskOfferInput;
import servicemarket.servicemarket.model.InputDto.TaskRequestInput;
import servicemarket.servicemarket.model.mapper.TaskOfferMapper;
import servicemarket.servicemarket.model.mapper.TaskRequestMapper;
import servicemarket.servicemarket.repository.TaskRepository;

@ExtendWith(MockitoExtension.class)
class TaskServiceTests {

    @Mock
    private ImagesConverter imagesConverter;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private CategoryService categoryService;

    @Mock
    private TaskOfferMapper taskOfferMapper;

    @Mock
    private TaskRequestMapper taskRequestMapper;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private TaskServiceImpl taskService;

    private TaskOffer taskOffer;
    private TaskRequest taskRequest;
    private TaskOfferInput taskOfferInput;
    private TaskRequestInput taskRequestInput;

    @BeforeEach
    void setUp() {

        taskOffer = TaskOffer.builder()
                .id("1")
                .createdBy("testUser")
                .title("OfferRepair")
                .description("The kitchen s2ink")
                .price(new BigDecimal("3020.00"))
                .expiryDate(LocalDateTime.parse("2025-01-20T10:00:00"))
                .build();

        taskRequest = TaskRequest.builder()
                .id("2")
                .createdBy("testUser")
                .title("RequestRepair")
                .description("The kitchen s2ink")
                .price(new BigDecimal("3020.00"))
                .location("Warsaw, street13")
                .deadline(LocalDateTime.parse("2025-01-20T10:00:00"))
                .build();

        taskOfferInput = TaskOfferInput.builder()
                .title("Updated Task Offer")
                .description("Updated description for the offer")
                .price(new BigDecimal("3500.00"))
                .expiryDate(LocalDateTime.parse("2025-02-20T10:00:00"))
                .build();

        taskRequestInput = TaskRequestInput.builder()
                .title("Updated Task Request")
                .description("Updated description for the request")
                .price(new BigDecimal("3500.00"))
                .location("Updated Location, street15")
                .deadline(LocalDateTime.parse("2025-02-20T10:00:00"))
                .build();
        SecurityContextHolder.setContext(securityContext);

    }

    @Test
    void testGetAllTaskOffers() {
        // Given
        Page<Task> taskPage = new PageImpl<>(List.of(taskOffer));
        when(taskRepository.findAll(PageRequest.of(0, 10))).thenReturn(taskPage);

        // When
        Page<TaskOffer> result = taskService.getAllTasksOffers(0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(taskRepository, times(1)).findAll(PageRequest.of(0, 10));
    }

    @Test
    void testGetAllTaskRequests() {
        // Given
        Page<Task> taskPage = new PageImpl<>(List.of(taskRequest));
        when(taskRepository.findAll(PageRequest.of(0, 10))).thenReturn(taskPage);

        // When
        Page<TaskRequest> result = taskService.getAllTasksRequests(0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(taskRepository, times(1)).findAll(PageRequest.of(0, 10));
    }

    @Test
    void testGetTaskById() {
        // Given
        when(taskRepository.findById("1")).thenReturn(Optional.of(taskOffer));

        // When
        Task result = taskService.getTaskById("1");

        // Then
        assertNotNull(result);
        assertEquals("1", result.getId());
    }

    @Test
    void testGetTaskById_NotFound() {
        // Given
        when(taskRepository.findById("99")).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.getTaskById("99"));
        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void testCreateTaskRequest() {
        // Given
        when(authentication.getName()).thenReturn("testUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);

        when(taskRequestMapper.toEntity(taskRequestInput)).thenReturn(taskRequest);
        when(taskRepository.save(any(Task.class))).thenReturn(taskRequest);
        when(categoryService.addTask(anyString(), any(Task.class))).thenReturn(taskRequest);

        // When
        Task result = taskService.createTaskRequest(taskRequestInput, "1");

        // Then
        assertNotNull(result);
        assertEquals("testUser", result.getCreatedBy());
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void testCreateTaskOffer() {
        // Given
        when(authentication.getName()).thenReturn("testUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);

        when(taskOfferMapper.toEntity(taskOfferInput)).thenReturn(taskOffer);
        when(taskRepository.save(any(Task.class))).thenReturn(taskOffer);
        when(categoryService.addTask(anyString(), any(Task.class))).thenReturn(taskOffer);

        // When
        Task result = taskService.createTaskOffer(taskOfferInput, "1");

        // Then
        assertNotNull(result);
        assertEquals("testUser", result.getCreatedBy());
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void testUpdateTaskRequest() {
        // Given
        when(authentication.getName()).thenReturn("testUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);

        when(taskRepository.findById("1")).thenReturn(Optional.of(taskRequest));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task savedTask = invocation.getArgument(0);
            savedTask.setTitle("Updated Task Request");
            return savedTask;
        });

        // When
        Task result = taskService.updateTask("1", taskRequestInput);

        // Then
        assertNotNull(result);
        assertEquals("Updated Task Request", result.getTitle());
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void testUpdateTaskOffer() {
        // Given
        when(authentication.getName()).thenReturn("testUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);

        when(taskRepository.findById("1")).thenReturn(Optional.of(taskOffer));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task savedTask = invocation.getArgument(0);
            savedTask.setTitle("Updated Task Request");
            return savedTask;
        });

        // When
        Task result = taskService.updateTask("1", taskOfferInput);

        // Then
        assertNotNull(result);
        assertEquals("Updated Task Request", result.getTitle());
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void testDeleteTask() {
        // Given
        when(authentication.getName()).thenReturn("testUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        taskRequest.setCreatedBy("testUser");

        when(taskRepository.findById("1")).thenReturn(Optional.of(taskRequest));

        // When
        taskService.deleteTask("1");

        // Then
        verify(taskRepository).deleteById("1");
    }

    @Test
    void testDeleteTask_NotFound() {
        // Given
        when(taskRepository.findById("99")).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.deleteTask("99"));
        assertEquals("Task with ID 99 not found", exception.getMessage());
    }

}
