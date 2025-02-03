package userservice.userservice.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import userservice.userservice.model.Role;
import userservice.userservice.model.RoleEnum;
import userservice.userservice.model.User;
import userservice.userservice.model.inputDto.LoginResponse;
import userservice.userservice.model.inputDto.LoginUserDto;
import userservice.userservice.model.inputDto.RegisterUserDto;
import userservice.userservice.model.mapper.RegisterUserDtoMapper;
import userservice.userservice.repository.RoleRepository;
import userservice.userservice.repository.UserRepository;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RegisterUserDtoMapper registerUserDtoMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User signup(RegisterUserDto registerUserDto) {

        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);

        if (optionalRole.isEmpty()) {
            return null;
        }

        if (userRepository.existsByUsername(registerUserDto.getUsername())
                || userRepository.existsByEmail(registerUserDto.getEmail())) {
            throw new IllegalArgumentException("Username or email already exists");
        }

        User user = registerUserDtoMapper.toEntity(registerUserDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(optionalRole.get());

        return userRepository.save(user);
    }

    @Override
    public User authenticate(LoginUserDto input) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()));

        return userRepository.findByUsername(input.getUsername())
                .orElseThrow();
    }

    @Override
    public LoginResponse token(LoginUserDto loginUserDto) {

        String jwtToken = jwtService.generateToken(authenticate(loginUserDto));

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return loginResponse;
    }

    @Override
    public User updateUser(Long id, RegisterUserDto updatedUserDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isEmpty()) {
            throw new RuntimeException("User with ID " + id + " not found.");
        }

        User existingUser = existingUserOpt.get();
        if (!existingUser.getUsername().equals(loggedInUsername) &&
                !authentication.getAuthorities().stream().anyMatch(
                        authority -> authority.getAuthority().equals("SUPER_ADMIN"))) {
            throw new AccessDeniedException("You do not have permission to edit this account.");
        }

        registerUserDtoMapper.updateEntityFromDto(updatedUserDto, existingUser);
        existingUser.setPassword(passwordEncoder.encode(updatedUserDto.getPassword()));
        existingUser.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(existingUser);
    }

    @Override
    public void logout(String token) {
        jwtService.invalidateToken(token);
    }

}
