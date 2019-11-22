package com.test.web.cust;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.web.pxy.Box;
import com.test.web.pxy.Proxy;

@RestController
@RequestMapping("/customer")
public class CustCtrl {
	private static final Logger logger = LoggerFactory.getLogger(CustCtrl.class);

	@Autowired CustMapper custMapper;
	@Autowired Box<Integer> box;
	@Autowired Proxy pxy;
	
	public int rowCount(){
		int rowCount = custMapper.rowCount();
		pxy.print("rowCount"+rowCount);
		box.put("rowCount", rowCount);
		return box.get("rowCount");
	}
	
}
