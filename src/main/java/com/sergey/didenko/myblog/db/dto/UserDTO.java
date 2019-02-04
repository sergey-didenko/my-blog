package com.sergey.didenko.myblog.db.dto;

import com.sergey.didenko.myblog.db.entity.Role;
import com.sergey.didenko.myblog.db.entity.User;
import com.sergey.didenko.myblog.db.enums.RoleEnum;

import java.util.Set;
import java.util.stream.Collectors;

public class UserDTO {

    private Long id;

    private String name;

    private String username;

    private String email;

    private Set<RoleEnum> roleSet;

    public UserDTO() {

    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.email = user.getEmail();

        this.roleSet = user.getRoleSet().stream()
                .map(Role::getRole)
                .collect(Collectors.toSet());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<RoleEnum> getRoleSet() {
        return roleSet;
    }

    public void setRoleSet(Set<RoleEnum> roleSet) {
        this.roleSet = roleSet;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", roleSet=" + roleSet +
                '}';
    }
}
