package com.example.api.application.service.impl;

import com.example.api.application.dto.RoleDto;
import com.example.api.application.mapper.RoleMapper;
import com.example.api.application.service.RoleService;
import com.example.api.domain.entity.Role;
import com.example.api.domain.persistence.RolePersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleServiceImpl implements RoleService {
    private final RolePersistence rolePersistence;
    private final RoleMapper roleMapper;


    @Autowired
    public RoleServiceImpl(RolePersistence rolePersistence, RoleMapper roleMapper) {
        this.rolePersistence = rolePersistence;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<RoleDto> getAllRoles() {
        List<Role> roles = rolePersistence.getAllRoles();
        return roleMapper.toDto(roles);
    }
}
