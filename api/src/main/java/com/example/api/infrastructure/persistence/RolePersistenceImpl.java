package com.example.api.infrastructure.persistence;

import com.example.api.domain.entity.Role;
import com.example.api.domain.persistence.RolePersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RolePersistenceImpl implements RolePersistence {
    private final RoleRepository roleRepository;

    @Autowired
    public RolePersistenceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
