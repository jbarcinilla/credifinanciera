/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.services;

import com.cf.controller.LoginController;
import com.cf.model.Usuario;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author jbarc
 */
@Path("login")
public class LoginServices {

    @EJB
    LoginController login;

    @POST
    @Path("/getUsuario")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response obtenerUsuario(Usuario u) {
        try {
            u.setEstado(login.obtenerUsuario(u));
            return Response.ok(u).build();
        } catch (Exception e) {
            Logger.getLogger("ERROR: " + e);
            return Response.serverError().build();
        }
    }

}
