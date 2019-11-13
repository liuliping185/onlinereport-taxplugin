package com.springboot.demo.dao;

import com.springboot.demo.entity.SB02Response;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SB02ResponseDao {
    int insertSB02Response(SB02Response sb02Response);

    List<SB02Response> selectSB02Response(String id);
}
