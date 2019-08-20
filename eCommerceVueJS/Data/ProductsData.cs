using eCommerceVueJS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceVueJS.Data
{
    public class ProductsData
    {

        public List<Product> list;

        public ProductsData()
        {
            list = new List<Product>();
            Product p = new Product();
            p.Imgurl = "https://images-na.ssl-images-amazon.com/images/I/61Zysd3NimL._SY450_.jpg";
            p.Name = "Backpack";
            p.Rating = 4;
            p.Offer_price = "100";
            p.Actual_price = "143";
            p.Brand = "Armour";
            p.Description = "With a unique front quilted design, this Cargo fashion backpack has the perfect touch of style and the right amount of space.";
            p.Category = "new";
            p._collection = "BackPack";
            list.Add(p);

            Product p2 = new Product();
            p2.Imgurl = "http://www.rohtakdeal.com/wp-content/uploads/2017/04/handbag2.1.jpg";
            p2.Name = "Hand Bag";
            p2.Rating = 5;
            p2.Offer_price = "160";
            p2.Actual_price = "243";
            p2.Brand = "ck";
            p2.Description = "With a unique front quilted design, this Cargo fashion backpack has the perfect touch of style and the right amount of space.";
            p2.Category = "top";
            p2._collection = "HandBag";
            list.Add(p2);

            Product p3 = new Product();
            p3.Imgurl = "https://gaytravelagent.files.wordpress.com/2014/12/1472921_668054763227677_565183006_n.jpg?w=400&h=450";
            p3.Name = "Brough Douglas T-shirt";
            p3.Rating = 3;
            p3.Offer_price = "60";
            p3.Actual_price = "85";
            p3.Brand = "Brough Douglas";
            p3.Description = "With a unique front quilted design, this Cargo fashion backpack has the perfect touch of style and the right amount of space.";
            p3.Category = "featured";
            p3._collection = "shirts";
            list.Add(p3);

            Product p4 = new Product();
            p4.Imgurl = "https://www.tacticalintentusa.com/wp-content/uploads/2017/10/41-Dv8KjIUL-400x450.jpg";
            p4.Name = "Cap";
            p4.Rating = 5;
            p4.Offer_price = "25";
            p4.Actual_price = "45";
            p4.Brand = "Armour";
            p4.Description = "With a unique front quilted design, this Cargo fashion backpack has the perfect touch of style and the right amount of space.";
            p4.Category = "new";
            p4._collection = "caps";
            list.Add(p4);
            
        }

        public void Add(Product product)
        {
            list.Add(product);
        }
    }
}
