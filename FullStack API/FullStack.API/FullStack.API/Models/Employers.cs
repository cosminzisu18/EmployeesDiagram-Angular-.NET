using System.Text.Json.Serialization;

namespace FullStack.API.Models
{
    public class Employers
    {
        public Guid Id { get; set; }
        public string NameEmployer { get; set; }
        public string EmailEmployer { get; set; }
        public string PhoneEmployer { get; set; }
        public string DepartmentEmployer { get; set; }

        [JsonIgnore]
        public ICollection<Employees> Employees { get; set; }

        [JsonIgnore]
        public ICollection<Observations> Observations { get; set; }

    }
}
