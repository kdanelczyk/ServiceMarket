package servicemarket.servicemarket.service;

import org.springframework.data.domain.Page;

import servicemarket.servicemarket.model.Task;
import servicemarket.servicemarket.model.TaskOffer;
import servicemarket.servicemarket.model.TaskRequest;
import servicemarket.servicemarket.model.InputDto.TaskOfferInput;
import servicemarket.servicemarket.model.InputDto.TaskRequestInput;

public interface TaskService {

    public Page<TaskOffer> getAllTasksOffers(int page, int size);

    public Page<TaskRequest> getAllTasksRequests(int page, int size);

    public Page<TaskRequest> getTaskRequestsByCategoryId(String categoryId, int page, int size);

    public Page<TaskOffer> getTaskOffersByCategoryId(String categoryId, int page, int size);

    public Task getTaskById(String id);

    public void getInfoAboutIfLoggedIn(String id);

    public void getInfoAboutIfNotLoggedIn(String id, String nameOfTheQuestioner, String emailOfTheQuestioner);

    public Task createTaskRequest(TaskRequestInput taskRequestInput, String categoryId);

    public Task createTaskOffer(TaskOfferInput taskOfferInput, String categoryId);

    public Task updateTask(String id, TaskRequestInput taskRequestInput);

    public Task updateTask(String id, TaskOfferInput taskOfferInput);

    public byte[] getTaskImage(String taskId, int index);

    public void deleteTask(String id);

}
