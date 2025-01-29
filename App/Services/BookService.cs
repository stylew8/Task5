using App.Models;
using Bogus;

namespace App.Services;

public class BookService : IBookService
{

    public List<Book> GenerateBooks(string language, int seed, double likes, double reviews, int page, int pageSize)
    {
        Randomizer.Seed = new Random(seed + page);

        var faker = new Faker<Book>(language)
            .RuleFor(b => b.Index, f => (page - 1) * pageSize + f.IndexFaker + 1)
            .RuleFor(b => b.ISBN, f => f.Random.Replace("###-#-##-######-#"))
            .RuleFor(b => b.Title, f => $"{f.Commerce.ProductAdjective()} {f.Commerce.ProductMaterial()} {f.Commerce.Product()}")
            .RuleFor(b => b.Author, f => f.Name.FullName())
            .RuleFor(b => b.Publisher, f => $"{f.Company.CompanyName()}, {f.Date.Past().Year}")
            .RuleFor(b => b.Likes, f => GenerateLikes(likes))
            .RuleFor(b => b.Reviews, f => GenerateReviews(reviews, f))
            .RuleFor(b => b.Image, f => f.Image.PicsumUrl(Constants.BOOK_IMAGE_WIDTH, Constants.BOOK_IMAGE_HEIGHT));

        return faker.Generate(pageSize);
    }

    private int GenerateLikes(double likes)
    {
        return (int)Math.Round(likes);
    }

    private List<Reviews> GenerateReviews(double reviews, Faker faker)
    {
        var reviewList = new List<Reviews>();
        int reviewCount = (int)Math.Round(reviews);

        for (int i = 0; i < reviewCount; i++)
        {
            reviewList.Add(new Reviews()
            {
                FullName = faker.Name.FullName(),
                Message = faker.Rant.Review(Constants.PRODUCT_REVIEW_NAME)
            });
        }


        return reviewList;
    }
}