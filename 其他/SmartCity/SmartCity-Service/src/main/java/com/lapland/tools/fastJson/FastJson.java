package com.lapland.tools.fastJson;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.List;

public final class FastJson {

    public static void main(String[] args) {
        Person json = new Person(19, "李明");
        List<Person> list = new ArrayList<Person>();
        list.add(json);
        list.add(new Person(12, "张三"));

        // 将集合或者对象序例化成JSON
        System.out.println(JSON.toJSON(json));
        System.out.println(JSON.toJSON(list));

        // Json串反序列化成对象
        Person person = JSON.parseObject("{\"name\":\"李明\",\"age\":19}", Person.class);
        System.out.printf("name:%s,age:%d\n", person.getName(), person.getAge());
        String str = "[{\"name\":\"李明\",\"age\":19},{\"name\":\"张三\",\"age\":12}]";

        // 数组对象反序列化成集合
        List<Person> listPerson = JSON.parseArray(str, Person.class);
        for (Person item : listPerson) {
            System.out.println(item.getName());
            System.out.println(item.getAge());
        }

        // 没有对象直接解析JSON对象
        JSONObject jobj = JSON.parseObject("{\"name\":\"李明\",\"age\":19}");
        System.out.printf("name:%s,age:%d\n", jobj.getString("name"), jobj.getBigInteger("age"));

        // 没有对象直接解析JSON数组
        JSONArray jarr = JSON.parseArray("[{\"name\":\"李明\",\"age\":19},{\"name\":\"张三\",\"age\":12}]");
        for (int i = 0, len = jarr.size(); i < len; i++) {
            JSONObject temp = jarr.getJSONObject(i);
            System.out.printf("name:%s,age:%d\n", temp.getString("name"), temp.getBigInteger("age"));
        }

        for (Object obj : jarr) {
            System.out.println(obj.toString());
        }
    }
}