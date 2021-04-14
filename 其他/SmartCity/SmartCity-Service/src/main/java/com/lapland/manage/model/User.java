package com.lapland.manage.model;

import lombok.Data;

@Data
public class User {
    private Long id;

    private String usercode;

    private String username;

    private String password;

    private String salt;

    private String telphone;

    private String mobile;

    private String email;

    private String locked;
}