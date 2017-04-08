using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BookStoreApplication.Models;
using Microsoft.AspNet.Identity;
using System;

namespace BookStoreApplication.Controllers
{
    [RoutePrefix("api/Record")]
    public class RecordController : ApiController
    {
        private readonly ApplicationDbContext context;

        public RecordController()
        {
            context = new ApplicationDbContext();
        }

        //GET api/Record
        #region Получить список измерений пациента
        //[Authorize(Roles = "user")]
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetRecords()
        {
            string userId = User.Identity.GetUserId();
            List<RecordEEG> records = context.RecordEEG.Where(r => r.ApplicationUserId == userId).ToList();

            return Ok(records);
        }
        #endregion

        private bool Evaluate(double[] EEG)
        {
            double[,] paramOneTwo =
            {
                { -8.72195606,  -9.83682780,   30.9669884, -21.6299226,  -4.20817063,  -23.6175396, -2.40941752,  -17.3453143,  -13.7476549, 1.63393326,  -18.7200704,  -22.9782154, -37.9442308,  -6.33525474,  -25.3816305, -35.7199028 },
                { -0.991381696, 1.03269755,  -1.03985156,-1.72500559,  -2.59386212,   0.142816936,-0.0329247251,   2.72488058,  -1.04152181, 0.949133111,   0.0100154327,   1.02034827, -1.80907914,  -1.85221983,   0.360336898, 0.469942882 },
                { 4.40440089,   3.59308013,   13.5789997, 6.48009638,   13.2349068,  -2.17497364, 6.92605807,  -7.30320318,   7.58587825, -4.84433863,   1.42756497,  -3.09349055,-6.72846155,   0.149227917,  -2.56975271, -3.97992127 },
                { 5.96253073,   0.214608305,   5.77001247, 6.06372733,   8.96603348,  -3.72197331, 2.82419191,  -10.0718765,   3.72729134, -3.44830983,  -2.26560488,  -3.78738964,-2.10001611,   2.42875277,  -1.38533015, -4.00910930 },
                { 0.294244491,  -1.08831677,   1.74315207, -0.246981021,   1.67383581,  -2.88564708, 0.207382507,  -3.14495130,   0.162548482, -1.15381182,  -1.09540549,  -1.67355057, 1.69570322,   1.48659821,   1.28827649,  -0.716952450 },
                {-10.7905226,  -3.56325219,  -18.0860387, -11.3719072,  -24.7923418,   3.69940994, -10.5747760,   14.5729507,  -9.18939426, 5.49485183,  -1.46169164,   5.05110373, 8.07673909,  -4.16436698,   1.72716972, 9.31615041 },
                { 4.71549240,  -10.1356227,  -39.0306894, 1.24610633,  -11.6672870,  -0.928469247, -42.5061970,  -31.4176862,  -4.52786629, 14.9714141,  -7.72742732,   9.30106552, 21.5427396,  -6.27768758,   6.02143221, 12.7752458 },
                {-5.58484067,  -2.82369324,  -8.10370697, -15.9283113,  -7.99797103,   11.4067675, -4.54641342,   6.83610294,  -4.30695451, -1.10658406,  -9.35229764e-01,   2.90078055, -8.46400101,  -1.47876386e+01,  -4.66062593, 6.64851045 }
            };
            double[,] paramTwoThree =
            {
                {-30.6658772,   0.0281349663,  -7.36743164, -6.15395181,  -1.87644028,   10.8075892, 25.4587105,   7.75595405},
                { 30.7251225,  -2.67870853,   7.63442541,  5.15130860,   1.71493596,  -10.8860160, -25.3870106,  -7.65284741 }
            };

            double[] bayesesFirst = { 8.90096141, -2.00159306, -2.65432829, -1.6560523, -1.96519323, 3.08277991, 6.47397458, -0.32977377 };
            double[] bayesesSecond = { -3.30993814, 3.69242481 };

            double[] firstLayerResults = new double[8] { 0, 0, 0, 0, 0, 0, 0, 0 };

            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 16; j++)
                {
                    firstLayerResults[i] += paramOneTwo[i, j] * EEG[j];
                }
                firstLayerResults[i] += bayesesFirst[i];
                firstLayerResults[i] = 1 / (1 + Math.Exp(-firstLayerResults[i]));
            }

            double[] result = new double[2] { 0, 0 };

            for (int i = 0; i < 2; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    result[i] += firstLayerResults[j] * paramTwoThree[i, j];
                }
                result[i] += bayesesSecond[i];
                result[i] = 1 / (1 + Math.Exp(-result[i]));
            }

            return (result[0] > result[1]) ? false : true;
        }

        //POST api/Record
        #region Добавить измерение для пациента
        [Authorize(Roles = "user")]
        [HttpPost]
        public IHttpActionResult AddNewRecord(RecordAddModel model)
        {
            string userId = User.Identity.GetUserId();
            ApplicationUser user = context.Users.SingleOrDefault(u => u.Id == userId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            RecordEEG record = new RecordEEG()
            {
                Date = DateTime.Now,
                Result = Evaluate(model.Params),
                Params = new List<ParamEEGModel>(),
                ApplicationUser = context.Users.Where(u => u.Id == userId).SingleOrDefault(),
                ApplicationUserId = userId
            };

            context.RecordEEG.Add(record);

            context.SaveChanges();

            for (byte i = 1; i <= model.Params.Length; i++)
            {
                ParamEEGModel paramModel = new ParamEEGModel()
                {
                    Key = i,
                    Value = model.Params[i - 1],
                    RecordEEGId = record.Id,
                    RecordEEG = record
                };

                context.ParamsEEG.Add(paramModel);
            }

            context.SaveChanges();

            var temp = context.RecordEEG.ToList();
            return Ok();
        }
        #endregion

        //DELETE api/Record
        #region Удалить запись по id
        [Authorize(Roles = "user")]
        [HttpDelete]
        [Route("{idRecord}")]
        public IHttpActionResult DeleteRecord(string idRecord)
        {
            RecordEEG recordDelete = context.RecordEEG.SingleOrDefault(r => r.Id == idRecord);
            if (recordDelete != null)
            { 
                context.RecordEEG.Remove(recordDelete);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        #endregion
    }
}
