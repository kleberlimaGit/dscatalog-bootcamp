package com.devsuperior.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	@Query("SELECT DISTINCT p FROM Product p "
			+ "JOIN p.categories cats "
			+ "WHERE "
			+ "(COALESCE(:categories) IS NULL OR cats IN :categories) AND "
			+ "(LOWER(p.name) LIKE LOWER(CONCAT('%', :name , '%' )))")
	Page<Product> findBySearch(List<Category> categories, String name,  Pageable pageable); // coalesce adptaçao ao valor nulo no banco

}
