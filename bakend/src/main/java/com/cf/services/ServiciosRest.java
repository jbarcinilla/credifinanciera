/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.services;

import com.cf.controller.ServicesController;
import com.cf.model.Persona;
import java.util.List;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author jbarcinilla
 */
@Path("servicios")
public class ServiciosRest {

    @EJB
    ServicesController servicios;

    @POST
    @Path("/regPersona")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response guardarPersona(Persona p) {
        try {
            int guardar = servicios.regPersona(p);
            if (guardar > 0) {
                return Response.status(Response.Status.CREATED).build();
            } else {
                return Response.status(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            Logger.getLogger("ERROR: " + e);
            return Response.serverError().build();
        }
    }
    
    @POST
    @Path("/actualizar")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response actualizar(Persona p) {
        try {
            int act = servicios.actPersona(p);
            if (act > 0) {
                return Response.status(Response.Status.CREATED).build();
            } else {
                return Response.status(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            Logger.getLogger("ERROR: " + e);
            return Response.serverError().build();
        }
    }
    
    @DELETE
    @Path("/eliminar")
    @Consumes(MediaType.TEXT_PLAIN)
    public Response eliminar(String  nroDocumento) {
        try {
            int del = servicios.eliminarPersona(nroDocumento);
            if (del > 0) {
                return Response.status(Response.Status.OK).build();
            } else {
                return Response.status(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            Logger.getLogger("ERROR: " + e);
            return Response.serverError().build();
        }
    }

    @POST
    @Path("/lstPersona")
    @Produces(MediaType.APPLICATION_JSON)
    public Response lstPersona() {
        try {
            List<Persona> personas = servicios.lstPersonas();
            return Response.ok(personas).build();
        } catch (Exception e) {
            Logger.getLogger("ERROR: " + e);
            return Response.serverError().build();
        }
    }

}
