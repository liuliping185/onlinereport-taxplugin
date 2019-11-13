package com.springboot.demo.controller;

import com.springboot.demo.entity.SB02Response;
import com.springboot.demo.service.SB02ResponseService;
import org.quartz.SchedulerException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/sb02")
public class SB02ResponseController {
    @Resource
    private SB02ResponseService sb02ResponseService;
    private SB02Response sb02Response = new SB02Response();

    @RequestMapping(value = "/sb02respoonse", method = {RequestMethod.POST,RequestMethod.GET})
    public void SB02Response() throws Exception {
        // 1.定义目标文件
        File srcFile = new File("D:\\360MoveData\\Users\\Administrator\\Desktop\\newProject\\param.txt");
        // 2.创建一个流，指向目标文件
        byte[] bb = new byte[0];
        try {
            FileInputStream fis = new FileInputStream(srcFile);

            long filelength = srcFile.length();
            bb = new byte[(int) filelength];

            fis.read(bb);
            fis.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        sb02Response.setId("10111298000025892661_20190101_20191231_12402");
        sb02Response.setDjxh("10111298000025892661");
        sb02Response.setSbsqq("20190101");
        sb02Response.setSbsqz("20191231");
        sb02Response.setPzzlDm("12402");
        sb02Response.setResopnseParam(new String(bb));
        int back = sb02ResponseService.insertSB02Response(sb02Response);
    }

    @RequestMapping(value = "/getSB02respoonse", method = {RequestMethod.POST,RequestMethod.GET})
    public void getSB02respoonse() throws Exception {
        List<SB02Response> back = sb02ResponseService.selectSB02Response("10111298000025892661_20190101_20191231_12402");
    }

}
