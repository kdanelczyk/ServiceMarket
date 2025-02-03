package userservice.userservice.dataSeeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import userservice.userservice.model.Role;
import userservice.userservice.model.RoleEnum;
import userservice.userservice.model.User;
import userservice.userservice.model.inputDto.RegisterUserDto;
import userservice.userservice.model.mapper.RegisterUserDtoMapper;
import userservice.userservice.repository.RoleRepository;
import userservice.userservice.repository.UserRepository;

@Component
@Slf4j
@RequiredArgsConstructor
public class NecessaryDataSeeder implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RegisterUserDtoMapper registerUserDtoMapper;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createNecessaryRoles();
        createSuperAdmin();
    }

    private void createNecessaryRoles() {
        for (RoleEnum roleEnum : RoleEnum.values()) {
            roleRepository.findByName(roleEnum)
                    .orElseGet(() -> {
                        Role newRole = new Role(null, roleEnum);
                        roleRepository.save(newRole);
                        log.info("Added new role: {}", roleEnum);
                        return newRole;
                    });
        }
    }

    @Transactional
    private void createSuperAdmin() {
        log.info("Running AdminSeeder...");

        if (userRepository.findByEmail("super.admin@email.com").isPresent()) {
            log.info("SuperAdmin already exists. Skipping.");
            return;
        }

        Role superAdminRole = roleRepository.findByName(RoleEnum.SUPER_ADMIN)
                .orElseThrow(() -> new IllegalStateException("SUPER_ADMIN role does not exist!"));

        RegisterUserDto userDto = new RegisterUserDto();
        userDto.setUsername("superAdmin");
        userDto.setEmail("super.admin@email.com");
        userDto.setPassword("123456");
        userDto.setCity("AdminCity");
        userDto.setPhone("404404404");

        User user = registerUserDtoMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(superAdminRole);

        userRepository.save(user);
        log.info("Super Administrator created successfully!");
    }

}
