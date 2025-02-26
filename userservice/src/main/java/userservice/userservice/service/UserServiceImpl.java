package userservice.userservice.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import userservice.userservice.model.User;
import userservice.userservice.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public Page<User> getAllUsers(int page, int size) {
        Page<User> usersPage = userRepository.findAll(PageRequest.of(page, size));
        return new PageImpl<>(usersPage.getContent(), usersPage.getPageable(), usersPage.getTotalElements());
    }

    @Override
    public Optional<User> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new RuntimeException("User with id " + id + " not found");
        }
        return user;
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new RuntimeException("User with username " + username + " not found");
        }
        return user;
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User with email " + email + " not found");
        }
        return user;
    }

    @Override
    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        } else {
            throw new RuntimeException("Brak zalogowanego użytkownika");
        }
    }

    @Override
    public Map<String, Object> getUsersData(Map<String, Object> senderData) {
        System.out.println("Original Sender Data: " + senderData);

        if (!senderData.containsKey("emailOfTheQuestioner")) {
            Optional<User> requestingUserOpt = userRepository
                    .findByUsername(senderData.get("nameOfTheQuestioner").toString());
            if (requestingUserOpt.isPresent()) {
                senderData.put("requestingUserEmail", requestingUserOpt.get().getEmail());
            } else {
                throw new RuntimeException("User " + senderData.get("nameOfTheQuestioner") + " not found!");
            }
        }

        Optional<User> offerOwnerOpt = userRepository.findByUsername(senderData.get("offerOwner").toString());
        if (offerOwnerOpt.isPresent()) {
            User offerOwner = offerOwnerOpt.get();
            senderData.put("offerOwnerEmail", offerOwner.getEmail());
            senderData.put("offerOwnerNumber", offerOwner.getPhone());
        } else {
            throw new RuntimeException("Offer owner " + senderData.get("offerOwner") + " not found!");
        }

        System.out.println("After adding offer owner data: " + senderData);
        return senderData;
    }

    @Override
    public boolean deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
