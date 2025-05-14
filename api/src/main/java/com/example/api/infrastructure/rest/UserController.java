package com.example.api.infrastructure.rest;

import com.example.api.application.dto.UserDto;
import com.example.api.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @GetMapping(value = "/users", produces = "application/json")
    public ResponseEntity<Page<UserDto>> CreateUser(Pageable pageable){
        Page<UserDto> users = userService.getAllUsers(pageable);
        return new ResponseEntity<Page<UserDto>>(users, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(value = "/users", produces = "application/json")
    public ResponseEntity<UserDto> CreateUser(@RequestBody UserDto userDto){
        UserDto user = userService.saveUser(userDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}", produces = "application/json")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId){
        Optional<UserDto> user = userService.getUserById(userId);
        if(user.isPresent()){
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @PutMapping(value = "users/{userId}", produces = "application/json")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody UserDto userDto){
        UserDto user = userService.saveUser(userDto);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
