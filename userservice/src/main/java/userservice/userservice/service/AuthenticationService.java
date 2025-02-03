package userservice.userservice.service;

import userservice.userservice.model.User;
import userservice.userservice.model.inputDto.LoginResponse;
import userservice.userservice.model.inputDto.LoginUserDto;
import userservice.userservice.model.inputDto.RegisterUserDto;

public interface AuthenticationService {

    public User signup(RegisterUserDto registerUserDto);

    public LoginResponse token(LoginUserDto loginUserDto);

    public User authenticate(LoginUserDto input);

    public User updateUser(Long id, RegisterUserDto updatedUserDto);

    public void logout(String token);

}
