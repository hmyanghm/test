package com.test.web.cust;

import org.springframework.stereotype.Repository;

@Repository
public interface CustMapper {
	public void insertCustomer(Customer cust);
	public Customer selectByIdPw(Customer cust);
	public int existId(String cid);
	public int rowCount();

}
