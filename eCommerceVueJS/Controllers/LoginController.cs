using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceVueJS.Models;
using eCommerceVueJS.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eCommerceVueJS.Controllers
{
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class Response
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }

    [Route("[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext context;

        public LoginController(AppDbContext appDbContext)
        {
            context = appDbContext;

            if (context.Users.Count() == 0)
            {
                var password = PasswordHash.HashPassword("123");
                context.Users.Add(new Models.User { Email = "a@b.co", Password = password });
                context.SaveChanges();
            }
        }

        [HttpPost]
        public async Task<Response> Login([FromBody] Login login)
        {
            var r = new Response { Success = false, Message = "try again" };

            //see if email matches a user
            User user = await context.Users.SingleOrDefaultAsync(u => u.Email == login.Email);
            if (user != null)
                //see if password matches that user
                r.Success = PasswordHash.VerifyHashedPassword(user.Password, login.Password);

            if (r.Success)
            {
                r.Message = "Done";
                await HttpContext.Session.LoadAsync();
                HttpContext.Session.SetInt32("userId", user.Id);
                await HttpContext.Session.CommitAsync();
            }

            return r;
        }
        [HttpPost]
        public async Task<Response> Register([FromBody] Login login)
        {
            
            var r = new Response { Success = false, Message = "try again" };
            if (login.Email != null && login.Password != null)
            {
                var password = PasswordHash.HashPassword(login.Password);
                var user = context.Users.Add(new Models.User { Email = login.Email, Password = password });
                int result = context.SaveChanges();
                if(result == 1)
                {
                    r.Message = "Done";
                    r.Success = true;
                }
            }
            if (r.Success)
            {
                User user = await context.Users.SingleOrDefaultAsync(u => u.Email == login.Email);
                await HttpContext.Session.LoadAsync();
                HttpContext.Session.SetInt32("userId", user.Id);
                await HttpContext.Session.CommitAsync();
            }

            return r;
        }
    }
}
