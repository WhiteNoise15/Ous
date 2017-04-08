using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookStoreApplication.Models
{
    public class ParamEEGModel
    {
        public string Id { get; set; }

        public byte Key { get; set; }

        public double Value { get; set; }

        public string RecordEEGId { get; set; }

        public virtual RecordEEG RecordEEG { get; set; }

        public ParamEEGModel()
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }
}