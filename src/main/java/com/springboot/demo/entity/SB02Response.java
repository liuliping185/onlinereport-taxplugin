package com.springboot.demo.entity;

public class SB02Response {
    private String id;
    private String djxh;
    private String sbsqq;
    private String sbsqz;
    private String pzzlDm;
    private String resopnseParam;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDjxh() {
        return djxh;
    }

    public void setDjxh(String djxh) {
        this.djxh = djxh;
    }

    public String getSbsqq() {
        return sbsqq;
    }

    public void setSbsqq(String sbsqq) {
        this.sbsqq = sbsqq;
    }

    public String getSbsqz() {
        return sbsqz;
    }

    public void setSbsqz(String sbsqz) {
        this.sbsqz = sbsqz;
    }

    public String getPzzlDm() {
        return pzzlDm;
    }

    public void setPzzlDm(String pzzlDm) {
        this.pzzlDm = pzzlDm;
    }

    public String getResopnseParam() {
        return resopnseParam;
    }

    public void setResopnseParam(String resopnseParam) {
        this.resopnseParam = resopnseParam;
    }

    public SB02Response(String id, String djxh, String sbsqq, String sbsqz, String pzzlDm, String resopnseParam) {
        this.id = id;
        this.djxh = djxh;
        this.sbsqq = sbsqq;
        this.sbsqz = sbsqz;
        this.pzzlDm = pzzlDm;
        this.resopnseParam = resopnseParam;
    }

    public SB02Response() {
    }
}
