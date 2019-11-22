package com.test.web.cfg;

import javax.sql.DataSource;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@MapperScan(basePackages = {"com.test.web"})
@ComponentScan(basePackages = {"com.test.web"})
@Import({ServletConfig.class, MyBatisConfig.class})
public class RootConfig {
	@Bean
	public DataSource dataSource() {
		
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		
		dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/hmdb");
		dataSource.setUsername("hmdb");
		dataSource.setPassword("hmdb");
		
		return dataSource;
	}
}