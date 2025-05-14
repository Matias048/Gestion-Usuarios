package com.example.api.domain.persistence;

import com.example.api.domain.entity.Role;

import java.util.List;

public interface RolePersistence {
    List<Role> getAllRoles();
}
