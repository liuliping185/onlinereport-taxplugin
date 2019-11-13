//package com.springboot.demo.test;
//
//import java.io.*;
//
//public class ReadJson {
//    public static void main(String[] args) {
//        // 1.定义目标文件
//        File srcFile = new File("D:\\mydemo\\demo\\src\\main\\resources\\returnfile.json");
//        // 2.创建一个流，指向目标文件
//
//        try {
//            FileInputStream fis = new FileInputStream(srcFile);
//
//            long filelength = srcFile.length();
//            byte[] bb = new byte[(int)filelength];
//
//            fis.read(bb);
//            fis.close();
//            System.out.println(new String(bb));
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}