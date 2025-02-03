package userservice.userservice.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;

import userservice.userservice.model.User;

public interface UserService {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    void save(User user);

    Page<User> getAllUsers(int page, int size);

    Optional<User> getUserById(Long id);

    Optional<User> getUserByUsername(String username);

    Optional<User> getUserByEmail(String email);

    String getCurrentUsername();

    Map<String, Object> getUsersData(Map<String, Object> senderData);

    boolean deleteUserById(Long id);

}
