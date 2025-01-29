using App.Models;
using Bogus;

namespace App.Services;

public class BookService : IBookService
{

    public List<Book> GenerateBooks(string language, int seed, double likes, double reviews, int page, int pageSize)
    {
        return new Faker<Book>(language)
            .UseSeed(seed)
            .RuleFor(b => b.Index, f => (page - 1) * pageSize + f.IndexFaker + 1)
            .RuleFor(b => b.ISBN, f => f.Random.Replace("###-#-##-######-#"))
            .RuleFor(b => b.Title, f => $"{f.Commerce.ProductAdjective()} {f.Commerce.ProductMaterial()} {f.Commerce.Product()}")
            .RuleFor(b => b.Author, f => f.Name.FullName())
            .RuleFor(b => b.Publisher, f => $"{f.Company.CompanyName()}, {f.Date.Past().Year}")
            .RuleFor(b => b.Likes, f => GenerateLikes(likes))
            .RuleFor(b => b.Reviews, f => GenerateReviews(seed, language, reviews))
            .RuleFor(b => b.Image, f => f.Image.PicsumUrl(Constants.BOOK_IMAGE_WIDTH, Constants.BOOK_IMAGE_HEIGHT, imageId: int.Parse(f.Random.Replace("###"))))
            .Generate(pageSize);
    }

    private int GenerateLikes(double likes)
    {
        return (int)Math.Round(likes);
    }

    private List<Reviews> GenerateReviews(int seed,string language,double reviews)
    {
        var random = new Random(seed);
        var reviewsRandom = new Random(seed + 1000);

        var reviewsFaker = new Faker<Reviews>(language)
            .CustomInstantiator(f => new Reviews
            {
                FullName = f.Name.FullName(),
                Message = f.Rant.Review(Constants.PRODUCT_REVIEW_NAME)
            })
            .UseSeed(reviewsRandom.Next());

        return reviewsFaker.Generate((int)Math.Round(reviews));
    }
}