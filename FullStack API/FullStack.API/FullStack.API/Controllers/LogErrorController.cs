using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FullStack.API.Controllers
{
    [ApiController]
    [Route("api/error-logs")]
    public class ErrorLogController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public ErrorLogController(FullStackDbContext dbContext)
        {
            _context = dbContext;
        }

        [HttpPost]
        public async Task<ActionResult<LogError>> PostErrorLog(LogError errorLog)
        {
            try
            {
                errorLog.Timestamp = DateTime.UtcNow;
                _context.LogError.Add(errorLog);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetErrorLog", new { id = errorLog.Id }, errorLog);
            }
            catch (Exception ex)
            {
                return BadRequest("Error logging failed.");
            }
        }
    }
}
