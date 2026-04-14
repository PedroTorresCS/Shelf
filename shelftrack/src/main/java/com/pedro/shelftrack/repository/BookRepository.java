package com.pedro.shelftrack.repository;

import com.pedro.shelftrack.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}   