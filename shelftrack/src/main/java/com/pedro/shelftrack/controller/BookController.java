package com.pedro.shelftrack.controller;

import com.pedro.shelftrack.entity.Book;
import com.pedro.shelftrack.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/books")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> listarTodos() {
        return bookRepository.findAll();
    }

    @PostMapping
    public Book criar(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @GetMapping("/{id}")
    public Book buscarPorId(@PathVariable Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Book atualizar(@PathVariable Long id, @RequestBody Book novoBook) {
        return bookRepository.findById(id)
                .map(book -> {
                    book.setTitle(novoBook.getTitle());
                    book.setAuthor(novoBook.getAuthor());
                    book.setType(novoBook.getType());
                    book.setStatus(novoBook.getStatus());
                    return bookRepository.save(book);
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}