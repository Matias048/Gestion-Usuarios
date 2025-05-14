package com.example.api.application.mapper;

import com.example.api.application.dto.UserDto;
import com.example.api.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = RoleMapper.class)
public interface UserMapper extends EntityMapper<UserDto, User> {
    @Override
    @Mapping(source = "roleId", target = "role")
    User toEntity(UserDto dto);

    @Override
    @Mapping(source = "role.id", target = "roleId")
    @Mapping(source = "role.name", target = "roleName")
    UserDto toDto(User entity);


}
