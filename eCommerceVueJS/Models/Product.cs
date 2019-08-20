using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceVueJS.Models
{
    public class Product
    {
       
        public int Id { get; set; }
        public string Imgurl { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Actual_price { get; set; }
        public string Offer_price { get; set; }
        public int Rating { get; set; }
        public string Brand { get; set; }
        public string _collection { get; set; }
        public string Description { get; set; }
    }
}
