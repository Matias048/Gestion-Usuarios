package com.example.api.application.service.impl;

import com.example.api.application.dto.UserDto;
import com.example.api.application.mapper.UserMapper;
import com.example.api.application.service.UserService;
import com.example.api.domain.entity.User;
import com.example.api.domain.exception.EmailAlreadyExistsException;
import com.example.api.domain.persistence.UserPersistence;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {
    private final UserPersistence userPersistence;
    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserPersistence userPersistence, UserMapper userMapper) {
        this.userPersistence = userPersistence;
        this.userMapper = userMapper;
    }

    @Override
    public Page<UserDto> getAllUsers(Pageable pageable) {
        Page<User> users = userPersistence.getAllUsers(pageable);
        return users.map(userMapper::toDto);
    }


    @Override
    public UserDto saveUser(UserDto userDto) {
        try{
            return userMapper.toDto(userPersistence.saveUser(userMapper.toEntity(userDto)));
        }catch (DataIntegrityViolationException ex){
            if(ex.getMessage().toLowerCase().contains("email")){
                throw new EmailAlreadyExistsException("El email ya esta en uso");
            }
            throw ex;
        }
    }

    @Override
    public Optional<UserDto> getUserById(Long userId) {
        return userPersistence.getUserById(userId).map(userMapper::toDto);
    }

}
