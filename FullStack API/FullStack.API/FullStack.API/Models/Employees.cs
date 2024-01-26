using System.ComponentModel.DataAnnotations.Schema;

namespace FullStack.API.Models
{
    public class Employees
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Salary { get; set; }
        public string Department { get; set; }
        public Guid EmployersId { get; set; } 

        [ForeignKey("EmployersId")]
        public Employers Employers { get; set; }

    }
}
