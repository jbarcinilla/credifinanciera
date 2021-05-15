/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.controller;


import javax.annotation.Resource;
import javax.sql.DataSource;

/**
 *
 * @author jbarcinilla
 */
public abstract class ConexionBD {



    @Resource(name = "cf")
    public DataSource dataSourcePostGres;

 

 

}
