package com.lapland.manage.model;

import lombok.Data;

@Data
public class Permission {
    private Long id;

    private Long parentId;

    private String name;

    private String type;

    private Long sortNo;

    private String url;

    private String permCode;

    private String icon;

    private String desc;
}