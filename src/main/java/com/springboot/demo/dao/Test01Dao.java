package com.springboot.demo.dao;

import com.springboot.demo.entity.Test01;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Test01Dao {
    int insertOne(Test01 test01);
    int insertTwo(String sql);
    List<Test01> selectAll(String sql);
}