package com.test;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    public Product create(Product product) {
        product.setId(null);
        return repository.save(product);
    }

    public Product update(Long id, Product product) {
        Product existing = getById(id);
        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setCategory(product.getCategory());
        existing.setDescription(product.getDescription());
        return repository.save(existing);
    }

    public void delete(Long id) {
        Product existing = getById(id);
        repository.delete(existing);
    }

    public List<Product> searchByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return getAll();
        }
        return repository.findByNameContainingIgnoreCase(name.trim());
    }

    public Product getMaxPriceProduct() {
        return repository.findFirstByOrderByPriceDesc()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No products found"));
    }
}
