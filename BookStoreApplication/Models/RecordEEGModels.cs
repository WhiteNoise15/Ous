using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApplication.Models
{
    // Модель автора книги
    public class RecordEEG
    {
        [ScaffoldColumn(false)]
        public string Id { get; set; }

        public DateTime Date { get; set; }

        public bool Result { get; set; }

        public string ApplicationUserId { get; set; }

        [ForeignKey("ApplicationUserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }

        public virtual ICollection<ParamEEGModel> Params { get; set; }

        public RecordEEG()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Params = new List<ParamEEGModel>();
        }
    }

    public class RecordAddModel
    {
        public double[] Params { get; set; }
    }
}