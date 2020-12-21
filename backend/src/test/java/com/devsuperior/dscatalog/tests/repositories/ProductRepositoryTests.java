package com.devsuperior.dscatalog.tests.repositories;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	private long countTotalProducts;
	private long countPCGamerProducts;
	private List<Category> categories;
	private PageRequest pageRequest;
	
	
	@BeforeEach
	void setUp() throws Exception {
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest =  PageRequest.of(0, 10);
		
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		String name = "PC Gamer";
		
		Page<Product> result = repository.findBySearch(null, name,pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenNonName() {
	
		String name = "";
		
		Page<Product> result = repository.findBySearch(null, name ,pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAnyCategoryWhenIdExists() {
	
		String name = "";
		categories = Arrays.asList(categoryRepository.getOne(2L));
		
		Page<Product> result = repository.findBySearch(categories, name ,pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(2L, result.getTotalElements());
		
	}
	

	
}

	
