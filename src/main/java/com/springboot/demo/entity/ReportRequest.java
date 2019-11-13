package com.springboot.demo.entity;

/**
 * 统一请求报文数据
 *
 * @author CM 2018.12.18
 *
 */
public class ReportRequest {
	private String serviceName;
	private String token;
	private Object requestBean;

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Object getRequestBean() {
		return requestBean;
	}

	public void setRequestBean(Object requestBean) {
		this.requestBean = requestBean;
	}

	public ReportRequest(){
	}

	public ReportRequest(String token,String serviceName,Object requestBean) {
		this.serviceName = serviceName;
		this.token = token;
		this.requestBean = requestBean;
	}

}
