package com.springboot.demo.controller;

class SuperClass{
    static{
        value = 1234;
    }
    public static int value = 123;
    static{
        System.out.println("SuperClass:" + value);
    }
}

class SubClass extends SuperClass{
//public static aaa void ()
//    static int value = 12345;
    static{
        int value = 12345;
        System.out.println("SubClass:11111111111111111:"+value);
    }
}

public class Study {
    public static void main(String[] args) {
        System.out.println(SubClass.value);
    }
}
