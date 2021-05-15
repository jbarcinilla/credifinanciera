/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.controller;

import com.cf.model.Usuario;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.LocalBean;
import java.sql.ResultSet;
import javax.ejb.Stateless;

/**
 *
 * @author jbarc
 */
@Stateless
@LocalBean
public class LoginController extends ConexionBD {

    public boolean obtenerUsuario(Usuario u) {
        StringBuilder sb = new StringBuilder();
        sb.append(" select p.correoelectronico, u.contraseña");
        sb.append(" from persona p");
        sb.append(" inner join usuario u");
        sb.append(" on p.nrodocumento = u.nrodocumento");
        sb.append(" where p.correoelectronico =?");
        sb.append(" and u.contraseña =?");
        u.setPassword(convertirSHA256(u.getPassword()));
        try (Connection con = dataSourcePostGres.getConnection(); PreparedStatement ps = con.prepareStatement(sb.toString());) {
            ps.setString(1, u.getUsername());
            ps.setString(2, u.getPassword());
            try (ResultSet rs = ps.executeQuery();) {
                return rs.next();
            }

        } catch (Exception e) {
            System.err.println("com.cf.controller.ServicesController.regPersona()" + e);
            Logger.getLogger(ServicesController.class.getName()).log(Level.SEVERE, "ERROR: {0}", e);
        }
        return false;
    }

    private String convertirSHA256(String password) {
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
