package com.springboot.demo.service;

import com.springboot.demo.dao.Test01Dao;
import com.springboot.demo.entity.Test01;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("test01Service")
public class Test01Service {
    @Resource
    private Test01Dao test01Dao;

    public int insert(Test01 test01){
        return test01Dao.insertOne(test01);
    }
    public int insertTwo(String sql){
        return test01Dao.insertTwo(sql);
    }
    public List<Test01> selectAll(String sql){
        return test01Dao.selectAll(sql);
    }
}
