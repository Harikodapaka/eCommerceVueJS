using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceVueJS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerceVueJS.Controllers
{
    public class CartResponse
    {
        public int Count { get; set; }
        public List<Product> Items { get; set; }
        public TotalResponse Total { get; set; }
    }
    public class TotalResponse
    {
        public double Sub_total { get; set; }
        public double Hst { get; set; }
        public double Total { get; set; }

    }
    public class AddCartReq
    {
        public int productID { get; set; }
        public int quantity { get; set; }
    }
    public class RemoveCartReq
    {
      public int productID { get; set; }
    }
    [Route("[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext context;
        public CartController(AppDbContext appDbContext) => context = appDbContext;

        
        [HttpGet]
        public async Task<CartResponse> GetCartItems()
        {
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            return CreateResponse(userId);
        }

        [HttpPost]
        public async Task<CartResponse> AddtoCart([FromBody] AddCartReq Req)
        {
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            var cartData = context.Cart.Where(Items => (Items.UserID == userId && Items.Id == Req.productID)).ToList();

            if (cartData.Count == 0)
            {
                var cart = new Cart();
                cart.ProductID = Req.productID;
                cart.Quantity = Req.quantity;
                cart.UserID = (int)userId;
                context.Cart.Add(cart);
                await context.SaveChangesAsync();
            }
            return CreateResponse(userId);
        }

        [HttpPost]
        public async Task<CartResponse> RemoveCartItem([FromBody] RemoveCartReq Req)
        {
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            var cartData = context.Cart.Where(Items => (Items.UserID == userId && Items.ProductID == Req.productID)).ToList();
            if(cartData.Count == 1)
            {
                context.Cart.Remove(cartData.First());
                await context.SaveChangesAsync();
            }
            return CreateResponse(userId);
        }

        [HttpPost]
        public async Task<CartResponse> UpdateQuantity([FromBody] AddCartReq Req)
        {
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            var cartData = context.Cart.Where(Items => (Items.UserID == userId && Items.ProductID == Req.productID)).ToList();
            if (cartData.Count == 1)
            {
                var CartItem = cartData.First();
                CartItem.Quantity = Req.quantity;
                context.Cart.Update(CartItem);
                await context.SaveChangesAsync();
            }
            return CreateResponse(userId);
        }

        public CartResponse CreateResponse(int? id)
        {
            var response = new CartResponse();
            response.Items = new List<Product>();
            if (id == null)
                return response;
            var cartData = context.Cart.Where(Items => Items.UserID == id).ToList();
            var ProductData = context.Products.ToList();

            double total_price = 0;
            ProductData.ForEach(product=> {
                cartData.ForEach(cartItem=> {
                    bool c = product.Id == cartItem.Id;
                    if(product.Id == cartItem.ProductID)
                    {
                        product.Id = cartItem.ProductID;
                        product._collection = cartItem.Quantity.ToString();
                        int tot = int.Parse(product.Offer_price) * cartItem.Quantity;
                        product.Offer_price = tot.ToString(); 
                        total_price += int.Parse(product.Offer_price);
                        response.Items.Add(product);
                    }
                });
            });
            response.Count = response.Items.Count != 0 ? response.Items.Count : 0;
            double hst = total_price * 0.13;
            var total = new TotalResponse { Hst = hst, Sub_total = total_price, Total = total_price + hst };
            response.Total = total;
            return response;
        }
    }
}
