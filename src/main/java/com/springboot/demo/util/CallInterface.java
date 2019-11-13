package com.springboot.demo.util;

import com.alibaba.fastjson.JSON;
import com.springboot.demo.entity.ReportRequest;
import com.springboot.demo.entity.ReportResponse;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class CallInterface {
    public static final String GBK_RESPONSE_NAME = "GBK";
    public static final String UTF8_RESPONSE_NAME = "UTF-8";
    public static final String GB_RESPONSE_NAME = "GB2312";

    protected static final String DEFAULT_RESPONSE_NAME = GBK_RESPONSE_NAME;

    protected static final int HTTP_SUCCESS_CODE = 200;

    public static ReportResponse call(ReportRequest req, String responseCharset) throws Exception {
        return callGsjk(req, responseCharset);
    }

    protected static ReportResponse callGsjk(ReportRequest req, String responseCharset) {
        return send(req, "http://www.htcsw.com.cn:7070/sbjsweb/dzswjSbServlet", responseCharset);
    }

    private static ReportResponse send(ReportRequest req, String url, String responseCharset) {
        if (StringUtils.isEmpty(responseCharset)) {
            responseCharset = DEFAULT_RESPONSE_NAME;
        }
        String responseContent = null;
        long start = System.currentTimeMillis();
        Integer statusCode = null;
        CloseableHttpClient clients = null;
        CloseableHttpResponse response = null;
        StringBuffer buffer = new StringBuffer();

        try {

            // https接口特殊处理
            if (url.startsWith("https")) {
                clients = HttpsUtils.getHttpClient();
            } else {
                clients = HttpClients.createDefault();
            }

            HttpPost post = new HttpPost(url);

            RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(729000).setConnectionRequestTimeout(729000).setSocketTimeout(729000).build();
            post.setConfig(requestConfig);
            String IP = RandomIp.getIp();
            // IP虚假
            post.addHeader("x-forwarded-for", IP);
            if(StringUtils.isNotEmpty(null)){
                post.addHeader("token",req.getToken());
            }
            System.out.println("请求报文：加密----" + "{\"requestBean\":{\"sssqZ\":\"20191031\",\"sssqQ\":\"20191001\",\"djxh\":\"10111290000025399945\",\"token\":null},\"serviceName\":\"SB_01\",\"token\":null}");
            StringEntity entity = new StringEntity("{\"requestBean\":{\"sssqZ\":\"20191031\",\"sssqQ\":\"20191001\",\"djxh\":\"10111290000025399945\",\"token\":null},\"serviceName\":\"SB_01\",\"token\":null}", CallInterface.UTF8_RESPONSE_NAME);//解决中文乱码问题
            entity.setContentEncoding(CallInterface.UTF8_RESPONSE_NAME);
            entity.setContentType("application/json");
            post.setEntity(entity);
            response = clients.execute(post);

            statusCode = response.getStatusLine().getStatusCode();
            if (HTTP_SUCCESS_CODE == statusCode) {

                try (InputStream inputStream = response.getEntity().getContent()) {
                    InputStreamReader inputStreamReader = new InputStreamReader(inputStream, UTF8_RESPONSE_NAME);
                    BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                    String str = null;
                    while ((str = bufferedReader.readLine()) != null) {
                        buffer.append(str);
                    }
                    bufferedReader.close();
                    inputStreamReader.close();
                    // 释放资源
                    inputStream.close();
                    return parseResult(buffer.toString(),"{\"requestBean\":{\"sssqZ\":\"20191031\",\"sssqQ\":\"20191001\",\"djxh\":\"10111290000025399945\",\"token\":null},\"serviceName\":\"SB_01\",\"token\":null}");
                }
            } else {
                return new ReportResponse(false, String.format(ReportResponse.HTTP_ERROR_MESSAGE, statusCode));
            }
        } catch (ConnectTimeoutException e) {
            return new ReportResponse(false, e.getMessage());
        } catch (Exception e) {
            return new ReportResponse(false, "局端接口异常" + e.getMessage());
        } finally {
            // response、close 关闭
            try {
                if (response != null) {
                    response.getEntity().getContent().close();
                }
                if (clients != null) {
                    clients.close();
                }
            } catch (Exception e) {
            }
            long end = System.currentTimeMillis();
        }
    }

    /**
     * 解析报文方法
     *
     * @param content
     * @return
     */
    private static ReportResponse parseResult(String content,String resStr) {
        if (StringUtils.isEmpty(content)) {
            return null;
        }
        JSONObject str = JSONObject.fromObject(content);
        ReportResponse reportResponse = new ReportResponse(Boolean.valueOf(str.getString("result")), str.get("errorMessage").toString());
        if (reportResponse.isSuccess()) {
            reportResponse.setServiceName(str.get("serviceName").toString());
            reportResponse.setResponseBean(str.get("responseBean").toString());
            if(str.get("token")!=null){
                reportResponse.setToken(str.get("token").toString());
            }
        }
        reportResponse.setResStr(resStr);
        return reportResponse;
    }
}
