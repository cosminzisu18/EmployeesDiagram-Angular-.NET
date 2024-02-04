using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FullStack.API.Data;
using FullStack.API.Models;

namespace FullStack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObservationsController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public ObservationsController(FullStackDbContext context)
        {
            _context = context;
        }

        // GET: api/Observations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Observations>>> GetObservations()
        {
            return await _context.Observations.ToListAsync();
        }

        // GET: api/Observations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Observations>> GetObservations(int id)
        {
            var observations = await _context.Observations.FindAsync(id);

            if (observations == null)
            {
                return NotFound();
            }

            return observations;
        }


        [HttpGet("byemployee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Observations>>> GetObservationsByEmployee(Guid employeeId)
        {
            var observations = await _context.Observations
                .Where(o => o.EmployeesId == employeeId)
                .Include(o => o.Employers)
                .Include(o => o.Employees)
                .ToListAsync();

            if (observations == null || !observations.Any())
            {
                return NotFound();
            }

            return observations;
        }

        // PUT: api/Observations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObservations(int id, Observations observations)
        {
            if (id != observations.Id)
            {
                return BadRequest();
            }

            _context.Entry(observations).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObservationsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Observations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Observations>> PostObservations(Observations observations)
        {
            observations.Timestamp = DateTime.UtcNow;
            _context.Observations.Add(observations);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObservations", new { id = observations.Id }, observations);
        }

        // DELETE: api/Observations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObservations(int id)
        {
            var observations = await _context.Observations.FindAsync(id);
            if (observations == null)
            {
                return NotFound();
            }

            _context.Observations.Remove(observations);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ObservationsExists(int id)
        {
            return _context.Observations.Any(e => e.Id == id);
        }
    }
}
