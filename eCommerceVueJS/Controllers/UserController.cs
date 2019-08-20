using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceVueJS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eCommerceVueJS.Controllers
{
    public class UserResponse
    {
        public string Email { get; set; }
    }
    
    public class UserDetails
    {
        public string Email { get; set; }
        public int Id { get; set; }
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Provence { get; set; }
        public string PostalCode { get; set; }
    }
    [Route("[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext context;
        public UserController(AppDbContext appDbContext)
        {
            context = appDbContext;

        }
        [HttpGet]
        public async Task<UserResponse> GetUser()
        {
            var ur = new UserResponse() { Email = "" };

            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            User user = null;
            if(userId != null)
                user = await context.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (user != null)
                ur.Email = user.Email;

            return ur;
        }
        [HttpGet]
        public async Task<UserDetails> getUserDetails()
        {
            var ur = new UserDetails() { Email = "", Address="", FirstName="", Id= 0, LastName="", Phone="", PostalCode="", Provence="" };

            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            User user = null;
            if (userId != null)
                user = await context.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (user != null)
            {
                ur.Email = user.Email;
                ur.FirstName = user.FirstName;
                ur.LastName = user.LastName;
                ur.Phone = user.Phone;
                ur.Address = user.Address;
                ur.Id = user.Id;
                ur.PostalCode = user.PostalCode;
                ur.Provence = user.Provence;
            }

            return ur;
        }

        // POST: api/User
        [HttpPost]
        public async Task<Response> updateProfile([FromBody] User value)
        {
            var res = new Response() { Success = false, Message =" Try again" };
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            User user = null;
            if (userId != null)
                user = context.Users.Find(userId);
            if (user != null)
            {
                user.Email = value.Email;
                user.FirstName = value.FirstName;
                user.LastName = value.LastName;
                user.Phone = value.Phone;
                user.Address = value.Address;
                user.PostalCode = value.PostalCode;
                user.Provence = value.Provence;
                try
                {
                    context.Users.Update(user);
                    context.SaveChanges();
                    res.Message = "Success";
                    res.Success = true;

                }
                catch (Exception e)
                {

                }

            }
            return res;
        }
        

    }
}
