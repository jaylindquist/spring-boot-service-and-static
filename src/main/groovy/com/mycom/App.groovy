package com.mycom 

import org.springframework.boot.*
import org.springframework.boot.autoconfigure.*
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.*
import org.springframework.web.bind.annotation.*

@Configuration
@ComponentScan(basePackages = "com.mycom" )
@EnableAutoConfiguration
class App {
    public static void main(String[] args) throws Exception {
        def app = new SpringApplication(App.class)
		app.showBanner = false
		app.run(args)
    }
}