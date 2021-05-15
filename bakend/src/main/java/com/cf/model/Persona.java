/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.model;

import java.util.Objects;

/**
 *
 * @author jbarcinilla
 */
public class Persona {
    private String nroDocumento;
    private String nombre;
    private String apellido;
    private String fechaNacimiento;
    private String ciudad;
    private String correoElectronico;
    private String telefono;
    private String ocupacion;
    private boolean viable;

    public String getNroDocumento() {
        return nroDocumento;
    }

    public void setNroDocumento(String nroDocumento) {
        this.nroDocumento = nroDocumento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

 

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getOcupacion() {
        return ocupacion;
    }

    public void setOcupacion(String ocupacion) {
        this.ocupacion = ocupacion;
    }

    public boolean getViable() {
        return viable;
    }

    public void setViable(boolean viable) {
        this.viable = viable;
    }
    
    
    @Override
    public String toString() {
        return "Persona{" + "nroDocumento=" + nroDocumento + ", nombre=" + nombre + ", apellido=" + apellido + ", fchNacimiento=" + fechaNacimiento+ ", ciudad=" + ciudad + ", correoElectronico=" + correoElectronico + ", telefono=" + telefono + ", ocupacion=" + ocupacion + '}';
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 37 * hash + Objects.hashCode(this.nroDocumento);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Persona other = (Persona) obj;
        if (!Objects.equals(this.nroDocumento, other.nroDocumento)) {
            return false;
        }
        return true;
    }
    
    
    
    
    
}
