package com.example.api.domain.persistence;

import com.example.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface UserPersistence {
    Page<User> getAllUsers(Pageable pageable);
    User saveUser(User user);
    Optional<User> getUserById(Long userId);
    void deleteUser(Long userId);
    Page<User> getAllUsersByFilter(Pageable pageable, String filter);
}
