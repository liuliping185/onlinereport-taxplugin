package com.springboot.demo.service;

import com.springboot.demo.dao.SB02ResponseDao;
import com.springboot.demo.entity.SB02Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("sb02ResponseService")
public class SB02ResponseService {
    @Resource
    private SB02ResponseDao sb02ResponseDao;

    public int insertSB02Response(SB02Response sb02Response){
        return sb02ResponseDao.insertSB02Response(sb02Response);
    }

    public List<SB02Response> selectSB02Response(String id){
        return sb02ResponseDao.selectSB02Response(id);
    }
}
