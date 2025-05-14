package com.example.api.application.mapper;

import com.example.api.application.dto.RoleDto;
import com.example.api.domain.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper extends EntityMapper<RoleDto, Role>{

    default Role fromId (Long id){
        if (id == null) {
            return null;
        }
        Role role = new Role();
        role.setId(id);
        return role;
    }
}
