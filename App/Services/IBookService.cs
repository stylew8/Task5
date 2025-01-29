using App.Models;

namespace App.Services;

public interface IBookService
{
    List<Book> GenerateBooks(string language, int seed, double likes, double reviews, int page, int pageSize);
}