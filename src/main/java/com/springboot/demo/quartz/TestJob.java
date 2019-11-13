package com.springboot.demo.quartz;

import com.springboot.demo.entity.Test01;
import com.springboot.demo.service.Test01Service;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class TestJob extends QuartzJobBean {
    @Resource
    private Test01Service test01Service;

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        Test01 test01 = new Test01();
        test01.setId(UUID.randomUUID().toString());
        test01.setDate(new Date());
        test01Service.insert(test01);
        Date date = new Date();
        String str = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(str);
        System.out.println(sdf.format(date));
    }
}