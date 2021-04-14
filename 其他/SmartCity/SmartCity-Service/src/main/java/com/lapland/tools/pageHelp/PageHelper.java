package com.lapland.tools.pageHelp;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 封装返回数据实体类
 * @author zz
 * @date 下午9:40 18-8-7
 */
@Data
public class PageHelper<T> {

    // 分页大小
    private int limit;
    // 页码
    private int page;

    //实体类集合
    private List<T> rows = new ArrayList<T>();
    //数据总条数
    private int total;
}