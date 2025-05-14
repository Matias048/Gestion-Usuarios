package com.example.api.infrastructure.persistence;

import com.example.api.domain.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, Long> {
}
