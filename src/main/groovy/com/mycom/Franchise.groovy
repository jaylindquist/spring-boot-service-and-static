package com.mycom

import javax.sql.DataSource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class Franchise {
	private JdbcTemplate jdbcTemplate

	@Autowired
	public Franchise(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource)
	}
	
	@ResponseBody
	@RequestMapping('/franchise/{id}')
    String franchiseId(@PathVariable Long id) {
		try {
			return jdbcTemplate.queryForMap('SELECT id, title FROM franchises WHERE id=?', id)
		} catch(EmptyResultDataAccessException ex) {
			return Collections.EMPTY_MAP
		}
    }
	
	@ResponseBody
	@RequestMapping('/franchise/')
    String franchises() {
		try {
			return jdbcTemplate.queryForList('SELECT id, title FROM franchises')
		} catch(EmptyResultDataAccessException ex) {
			return Collections.EMPTY_MAP
		}
    }
}
