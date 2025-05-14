package com.example.api.domain.persistence;

import com.example.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserPersistence {
    Page<User> getAllUsers(Pageable pageable);
    User saveUser(User user);
    Optional<User> getUserById(Long userId);
    void deleteUser(Long userId);
}
