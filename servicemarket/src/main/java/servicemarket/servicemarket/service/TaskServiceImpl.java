package servicemarket.servicemarket.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import servicemarket.servicemarket.converter.ImagesConverter;
import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.TaskOffer;
import servicemarket.servicemarket.model.TaskRequest;
import servicemarket.servicemarket.model.InputDto.TaskOfferInput;
import servicemarket.servicemarket.model.InputDto.TaskRequestInput;
import servicemarket.servicemarket.model.mapper.TaskOfferMapper;
import servicemarket.servicemarket.model.mapper.TaskRequestMapper;
import servicemarket.servicemarket.rabbitmq.RabbitMQProducer;
import servicemarket.servicemarket.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private TaskOfferMapper taskOfferMapper;

    @Autowired
    private TaskRequestMapper taskRequestMapper;

    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    @Autowired
    private ImagesConverter imagesConverter;

    @Override
    public Page<TaskOffer> getAllTasksOffers(int page, int size) {
        Page<Task> tasksPage = taskRepository.findAll(PageRequest.of(page, size));
        List<TaskOffer> offers = tasksPage.stream()
                .filter(task -> task instanceof TaskOffer)
                .map(task -> (TaskOffer) task)
                .toList();
        return new PageImpl<>(offers, tasksPage.getPageable(), tasksPage.getTotalElements());
    }

    @Override
    public Page<TaskRequest> getAllTasksRequests(int page, int size) {
        Page<Task> tasksPage = taskRepository.findAll(PageRequest.of(page, size));
        List<TaskRequest> requests = tasksPage.stream()
                .filter(task -> task instanceof TaskRequest)
                .map(task -> (TaskRequest) task)
                .toList();
        return new PageImpl<>(requests, tasksPage.getPageable(), tasksPage.getTotalElements());
    }

    @Override
    public Page<TaskRequest> getTaskRequestsByCategoryId(String categoryId, int page, int size) {
        Page<Task> tasksPage = taskRepository.findByCategoryId(categoryId, PageRequest.of(page, size));
        List<TaskRequest> requests = tasksPage.stream()
                .filter(task -> task instanceof TaskRequest)
                .map(task -> (TaskRequest) task)
                .toList();
        return new PageImpl<>(requests, tasksPage.getPageable(), tasksPage.getTotalElements());
    }

    @Override
    public Page<TaskOffer> getTaskOffersByCategoryId(String categoryId, int page, int size) {
        Page<Task> tasksPage = taskRepository.findByCategoryId(categoryId, PageRequest.of(page, size));
        List<TaskOffer> offers = tasksPage.stream()
                .filter(task -> task instanceof TaskOffer)
                .map(task -> (TaskOffer) task)
                .toList();
        return new PageImpl<>(offers, tasksPage.getPageable(), tasksPage.getTotalElements());
    }

    @Override
    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public void getInfoAboutIfLoggedIn(String id) {
        Map<String, Object> senderData = new HashMap<>();
        Task task = taskRepository.findById(id).get();
        senderData.put("nameOfTheQuestioner", SecurityContextHolder.getContext().getAuthentication().getName());
        senderData.put("offerOwner", task.getCreatedBy());
        senderData.put("taskTitle", task.getTitle());
        rabbitMQProducer.sendRequest(senderData);
    }

    @Override
    public void getInfoAboutIfNotLoggedIn(String id, String nameOfTheQuestioner, String emailOfTheQuestioner) {
        Map<String, Object> senderData = new HashMap<>();
        Task task = taskRepository.findById(id).get();
        senderData.put("nameOfTheQuestioner", nameOfTheQuestioner);
        senderData.put("emailOfTheQuestioner", emailOfTheQuestioner);
        senderData.put("offerOwner", task.getCreatedBy());
        senderData.put("taskTitle", task.getTitle());
        rabbitMQProducer.sendRequest(senderData);
    }

    @Override
    public Task createTaskRequest(TaskRequestInput taskRequestInput, String categoryId) {
        Task task = taskRequestMapper.toEntity(taskRequestInput);
        task.setCreatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        task.setImages(imagesConverter.imagesConverter(taskRequestInput.getImages()));
        return taskRepository.save(categoryService.addTask(categoryId, task));
    }

    @Override
    public Task createTaskOffer(TaskOfferInput taskOfferInput, String categoryId) {
        Task task = taskOfferMapper.toEntity(taskOfferInput);
        task.setCreatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        task.setImages(imagesConverter.imagesConverter(taskOfferInput.getImages()));
        return taskRepository.save(categoryService.addTask(categoryId, task));
    }

    @Override
    public Task updateTask(String id, TaskRequestInput taskRequestInput) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with ID " + id + " not found"));
        String loggedInUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities();
        boolean isAdmin = authorities.stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")
                        || auth.getAuthority().equals("ROLE_SUPER_ADMIN"));
        if (!task.getCreatedBy().equals(loggedInUser) && !isAdmin) {
            throw new AccessDeniedException("You do not have permission to update this task.");
        }
        taskRequestMapper.updateEntityFromDto(taskRequestInput, task);
        task.setImages(imagesConverter.imagesConverter(taskRequestInput.getImages()));
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(String id, TaskOfferInput taskOfferInput) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with ID " + id + " not found"));
        String loggedInUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities();
        boolean isAdmin = authorities.stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")
                        || auth.getAuthority().equals("ROLE_SUPER_ADMIN"));
        if (!task.getCreatedBy().equals(loggedInUser) && !isAdmin) {
            throw new AccessDeniedException("You do not have permission to update this task.");
        }
        taskOfferMapper.updateEntityFromDto(taskOfferInput, task);
        task.setImages(imagesConverter.imagesConverter(taskOfferInput.getImages()));
        return taskRepository.save(task);
    }

    @Override
    public byte[] getTaskImage(String taskId, int index) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (task.getImages() == null || task.getImages().size() <= index) {
            throw new IndexOutOfBoundsException("Image not found for the given index.");
        }
        return task.getImages().get(index).getData();
    }

    @Override
    public void deleteTask(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with ID " + id + " not found"));
        String loggedInUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities();
        boolean isAdmin = authorities.stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")
                        || auth.getAuthority().equals("ROLE_SUPER_ADMIN"));
        if (!task.getCreatedBy().equals(loggedInUser) && !isAdmin) {
            throw new AccessDeniedException("You do not have permission to delete this task.");
        }

        taskRepository.deleteById(id);
    }

}
