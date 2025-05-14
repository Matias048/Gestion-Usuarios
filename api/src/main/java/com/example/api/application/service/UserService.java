package com.example.api.application.service;

import com.example.api.application.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;


public interface UserService {
    Page<UserDto> getAllUsers(Pageable pageable);
    UserDto saveUser(UserDto userDto);
    Optional<UserDto> getUserById(Long userId);
    void deleteUser(Long userId);
}
