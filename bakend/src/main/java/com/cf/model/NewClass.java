/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.model;

/**
 *
 * @author jbarc
 */
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class NewClass {

//    public static void main(String[] args) {
//        NewClass n = new NewClass();
//        String valor = n.convertirSHA256("12345678");
//        System.out.println("com.cf.model.NewClass.manin(): " + "[" + valor + "]");
//    }

    public String convertirSHA256(String password) {
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            System.err.println("com.cf.model.NewClass.convertirSHA256(): " + e);
            return null;
        }

        byte[] hash = md.digest(password.getBytes());
        StringBuilder sb = new StringBuilder();

        for (byte b : hash) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
