
package com.crud.crud.User.dto;

// Simple DTO to return username JSON
public class UserNameResponse {
    private String username;

    public UserNameResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}