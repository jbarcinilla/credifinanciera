/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.controller;

import com.cf.model.Persona;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;

/**
 *
 * @author jbarcinilla
 */
@Stateless
@LocalBean
public class ServicesController extends ConexionBD {

    public int regPersona(Persona p) {
        StringBuilder sb = new StringBuilder();
        sb.append(" INSERT INTO persona");
        sb.append(" (nrodocumento, nombres, apellidos, fechanacimiento, ciudad, correoelectronico, telefono, ocupacion, viable)");
        sb.append(" VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);");
        try (Connection con = dataSourcePostGres.getConnection(); PreparedStatement ps = con.prepareStatement(sb.toString());) {
            ps.setString(1, p.getNroDocumento());
            ps.setString(2, p.getNombre());
            ps.setString(3, p.getApellido());
            ps.setString(4, p.getFechaNacimiento());
            ps.setString(5, p.getCiudad());
            ps.setString(6, p.getCorreoElectronico());
            ps.setString(7, p.getTelefono());
            ps.setString(8, p.getOcupacion());
            ps.setBoolean(9, viable(p));
            return ps.executeUpdate();
        } catch (Exception e) {
            Logger.getLogger(ServicesController.class.getName()).log(Level.SEVERE, "ERROR: {0}", e);
        }
        return 0;
    }

    public int actPersona(Persona p) {
        StringBuilder sb = new StringBuilder();
        sb.append(" UPDATE persona");
        sb.append(" SET nombres=?,");
        sb.append(" apellidos=?,");
        sb.append(" fechanacimiento=?,");
        sb.append(" ciudad=?,");
        sb.append(" correoelectronico=?,");
        sb.append(" telefono=?,");
        sb.append(" ocupacion=?,");
        sb.append(" viable=?");
        sb.append(" WHERE nrodocumento=?");
        try (Connection con = dataSourcePostGres.getConnection(); PreparedStatement ps = con.prepareStatement(sb.toString());) {
            ps.setString(1, p.getNombre());
            ps.setString(2, p.getApellido());
            ps.setString(3, p.getFechaNacimiento());
            ps.setString(4, p.getCiudad());
            ps.setString(5, p.getCorreoElectronico());
            ps.setString(6, p.getTelefono());
            ps.setString(7, p.getOcupacion());
            ps.setBoolean(8, viable(p));
            ps.setString(9, p.getNroDocumento());
            return ps.executeUpdate();
        } catch (Exception e) {
            Logger.getLogger(ServicesController.class.getName()).log(Level.SEVERE, "ERROR: {0}", e);
        }
        return 0;
    }

    public int eliminarPersona(String nroDocumento) {
        StringBuilder sb = new StringBuilder();
        sb.append(" delete from usuario p");
        sb.append(" where p.nrodocumento =?");
        try (Connection con = dataSourcePostGres.getConnection(); PreparedStatement ps = con.prepareStatement(sb.toString());) {
            ps.setString(1, nroDocumento);
            return ps.executeUpdate();
        } catch (Exception e) {
            Logger.getLogger(ServicesController.class.getName()).log(Level.SEVERE, "ERROR: {0}", e);
        }
        return 0;
    }

    public List<Persona> lstPersonas() {
        StringBuilder sb = new StringBuilder();
        List<Persona> personas = new ArrayList();
        sb.append("SELECT p.nrodocumento, ");
        sb.append("p.nombres, ");
        sb.append("p.apellidos, ");
        sb.append("p.fechanacimiento, ");
        sb.append("p.ciudad, ");
        sb.append("p.correoelectronico, ");
        sb.append("p.telefono, ");
        sb.append("p.ocupacion, ");
        sb.append("p.viable ");
        sb.append("FROM persona as p");
        try (Connection con = dataSourcePostGres.getConnection(); PreparedStatement ps = con.prepareStatement(sb.toString());) {
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Persona p = new Persona();
                    p.setNroDocumento(rs.getString("nrodocumento"));
                    p.setNombre(rs.getString("nombres"));
                    p.setApellido(rs.getString("apellidos"));
                    p.setFechaNacimiento(rs.getString("fechanacimiento"));
                    p.setCiudad(rs.getString("ciudad"));
                    p.setCorreoElectronico(rs.getString("correoelectronico"));
                    p.setTelefono(rs.getString("telefono"));
                    p.setOcupacion(rs.getString("ocupacion"));
                    p.setViable(rs.getBoolean("viable"));
                    personas.add(p);
                }
            }

        } catch (Exception e) {
            Logger.getLogger(ServicesController.class.getName()).log(Level.SEVERE, "ERROR: {0}", e);
        }
        return personas;
    }

    private boolean viable(Persona p) {
        try {
            LocalDate fechaAct = LocalDate.now();
            LocalDate fechaNacimiento = LocalDate.parse(p.getFechaNacimiento());
            Period periodo = Period.between(fechaNacimiento, fechaAct);
            int años = periodo.getYears();
            return años >= 18 && años <= 65;
        } catch (Exception e) {
            Logger.getLogger(ServicesController.class.getName()).log(Level.SEVERE, "ERROR: {0}", e);
            return false;
        }

    }

}
