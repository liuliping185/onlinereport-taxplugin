package com.springboot.demo.entity;

/**
 * 统一请求返回数据
 *
 * @author CM 2018.12.18
 */
public class ReportResponse {
    private String serviceName;
    private Boolean result;
    private String errorMessage;
    private String responseBean;
    private String token;
    private String resStr;
    public static final String RETURN_CODE_SUCCESS = "00";
    public static final boolean RETURN_RESULT_SUCCESS = true;
    public static final boolean RETURN_RESULT_FAIL = false;
    public static final String LOCAL_ERROR_CODE = "-1";
    public static final String LOCAL_ERROR_MESSAGE = "处理接口返回信息错误，错误编号：%d";
    public static final String HTTP_ERROR_CODE = "-2";
    public static final String HTTP_ERROR_MESSAGE = "接口调用失败，HTTP返回状态：%d";
    public static final String PARSE_ERROR_CODE = "-3";
    public static final String NORESULT_ERROR_CODE = "-4";
    public static final String TIMEOUT_ERROR_CODE = "-5";
    public static final String NORESULT_ERROR_MESSAGE = "接口返回中无有效信息！";

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getResponseBean() {
        return responseBean;
    }

    public void setResponseBean(String responseBean) {
        this.responseBean = responseBean;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getResStr() {
        return resStr;
    }

    public void setResStr(String resStr) {
        this.resStr = resStr;
    }

    public boolean isSuccess() {
        return this.result;
    }

    public ReportResponse() {
    }

    public ReportResponse(boolean result, String errorMessage) {
        this.result = result;
        this.errorMessage = errorMessage;
    }

    public ReportResponse(boolean result, String serviceName, String errorMessage, String responseBean,String token) {
        this.result = result;
        this.responseBean = responseBean;
        this.serviceName = serviceName;
        this.errorMessage = errorMessage;
        this.token = token;
    }

}
