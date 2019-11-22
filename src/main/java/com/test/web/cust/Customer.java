package com.test.web.cust;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Lazy
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Customer{
	private String cno, cmail, cname, cpwd, cscod, cusjdate, wdate, ccrt, ccdate;
	
}
