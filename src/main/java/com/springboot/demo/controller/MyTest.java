package com.springboot.demo.controller;

import com.springboot.demo.config.QuartzConfig;
import com.springboot.demo.entity.ReportRequest;
import com.springboot.demo.entity.ReportResponse;
import com.springboot.demo.entity.Test01;
import com.springboot.demo.service.Test01Service;
import com.springboot.demo.util.CallInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Slf4j
@RestController
public class MyTest {
    @Autowired
    private QuartzConfig quartzConfig;
    @Autowired
    private Test01Service test01Service;

    @RequestMapping(value = "/selectSbbInfo", method = {RequestMethod.POST,RequestMethod.GET})
    public String taxInfoByNsrsbh() throws Exception {
        String str_all = "";

        InputStream inputStream = null;
        InputStreamReader fileInputStream = null;
        BufferedReader br = null;
        try {
            inputStream = new FileInputStream("D:\\新建文件夹\\1112\\return02.json");
            fileInputStream = new InputStreamReader(inputStream);
            br = new BufferedReader(fileInputStream);
            String str = null;
            try {
                while ((str = br.readLine()) != null) {
                    str_all += str;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                br.close();
                fileInputStream.close();
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return str_all;
    }

    @RequestMapping(value = "/consolelog", method = {RequestMethod.POST,RequestMethod.GET})
    public void consoleLog(){
        try{
            int i = 1 / 0;
        }catch (Exception e){
            log.debug("debug message");
            log.warn("warn message");
            log.info("info message");
            log.error("error message");
        }
    }

    /**
     * 获取Session
     * @param request
     */
    @RequestMapping(value = "/setSession", method = {RequestMethod.GET,RequestMethod.POST})
    public void setSession(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("username","can you can a can as a canner can a can");
        System.out.println(session.getAttribute("username"));
    }

    @RequestMapping(value = "/start", method = {RequestMethod.GET,RequestMethod.POST})
    public void start(HttpServletResponse response){
        try {
            quartzConfig.startJob();
        } catch (Exception e) {
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    @RequestMapping(value = "/modify", method = {RequestMethod.GET,RequestMethod.POST})
    public void modify(HttpServletResponse response,@RequestParam("cron")String cron){
        try {
            quartzConfig.modifyJob("job1","group1",cron);
        } catch (Exception e) {
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    @RequestMapping(value = "/pauseAll", method = {RequestMethod.GET,RequestMethod.POST})
    public void pauseAllJob(HttpServletResponse response){
        try {
            quartzConfig.pauseAllJob();
        } catch (Exception e) {
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    @RequestMapping(value = "/resumeAll", method = {RequestMethod.GET,RequestMethod.POST})
    public void resumeAllJob(HttpServletResponse response){
        try {
            quartzConfig.resumeAllJob();
        } catch (Exception e) {
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    @RequestMapping(value = "/delete", method = {RequestMethod.GET,RequestMethod.POST})
    public void deleteJob(HttpServletResponse response){
        try {
            quartzConfig.deleteJob("job1","group1");
        } catch (Exception e) {
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    @RequestMapping(value = "/refresh", method = {RequestMethod.GET,RequestMethod.POST})
    public void refresh(HttpServletResponse response) {
        Test01 test01 = new Test01();
        test01.setId(UUID.randomUUID().toString());
        test01.setDate(new Date());
        test01Service.insert(test01);
        Date date = new Date();
        String str = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(str);
        System.out.println(sdf.format(date));
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    @RequestMapping(value = "/testSql", method = {RequestMethod.GET,RequestMethod.POST})
    public String testSql(HttpServletResponse response,@RequestParam("sql")String sql) {//可执行增、删、改
        System.out.println("testSql========================================================》" +test01Service.insertTwo(sql));
        response.setHeader("Access-Control-Allow-Origin", "*");
        return "成功";
    }
    @RequestMapping(value = "/testSelectSql", method = {RequestMethod.GET,RequestMethod.POST})
    public void testSelectSql(HttpServletResponse response,@RequestParam("sql")String sql) {//可执行增、删、改
        System.out.println("testSelectSql========================================================》" +test01Service.selectAll(sql));
        response.setHeader("Access-Control-Allow-Origin", "*");
    }
    @RequestMapping(value = "/testRequest", method = {RequestMethod.GET,RequestMethod.POST})
    public void testRequest() {
        ReportResponse rr;
        try {
            rr = CallInterface.call(new ReportRequest(), CallInterface.UTF8_RESPONSE_NAME);
        }catch (Exception e) {
        }
    }

}