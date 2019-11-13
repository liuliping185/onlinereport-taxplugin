package com.springboot.demo.entity;

import java.util.Date;

public class Test01 {
    private String id;
    private Date nowdate;

    public Test01() {
    }

    public Test01(String id, Date nowdate) {
        this.id = id;
        this.nowdate = nowdate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return nowdate;
    }

    public void setDate(Date nowdate) {
        this.nowdate = nowdate;
    }
}
