package com.mycom

import javax.sql.DataSource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

import com.fasterxml.jackson.databind.node.NodeCursor.Object;

@Controller
class Game {
	private JdbcTemplate jdbcTemplate

	@Autowired
	public Game(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource)
	}
	
    @ResponseBody
	@RequestMapping('/franchise/{franchiseId}/game/{id}')
    String gameId(@PathVariable Long franchiseId, @PathVariable Long id) {
		try {
			return jdbcTemplate.queryForMap('SELECT id, name, release FROM games WHERE franchise_id=? AND id=?', franchiseId, id)
		} catch(EmptyResultDataAccessException ex) {
			return Collections.EMPTY_MAP
		}
    }
	
    @ResponseBody
	@RequestMapping('/franchise/{franchiseId}/game')
    String games(@PathVariable Long franchiseId) {
		try {
			return jdbcTemplate.queryForList('SELECT id, name, release FROM games WHERE franchise_id=?', franchiseId)
		} catch(EmptyResultDataAccessException ex) {
			return Collections.EMPTY_MAP
		}
    }
}
