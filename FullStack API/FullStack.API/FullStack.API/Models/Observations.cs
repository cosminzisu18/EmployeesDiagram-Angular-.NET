using System.ComponentModel.DataAnnotations.Schema;

namespace FullStack.API.Models
{
    public class Observations
    {
        public int Id { get; set; }
        public int Note { get; set; }
        public DateTime Timestamp { get; set; }
        public string Observation { get; set; }

        public Guid EmployersId { get; set; }
        public Guid EmployeesId { get; set; }

        [ForeignKey("EmployeesId")]
        public Employees Employees { get; set; }
        [ForeignKey("EmployersId")]
        public Employers Employers { get; set; }

    }
}
