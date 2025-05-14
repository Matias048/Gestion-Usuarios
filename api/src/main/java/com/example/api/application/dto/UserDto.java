package com.example.api.application.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserDto implements Serializable {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private Long roleId;
    private String roleName;
    private Integer version;
}
