using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;
using System.Globalization;
using App.Services;
using CsvHelper;
using App.Models;

namespace App.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public IActionResult GetBooks(string language, int seed, double likes, double reviews, int page, int pageSize = Constants.PAGE_SIZE)
        {
            var books = _bookService.GenerateBooks(language, seed, likes, reviews, page, pageSize);
            return Ok(books);
        }

    }
}
