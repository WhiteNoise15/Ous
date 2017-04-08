namespace BookStoreApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migrate_2212 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.ParamEEGModels", name: "RecordEEG_Id", newName: "RecordEEGId");
            RenameIndex(table: "dbo.ParamEEGModels", name: "IX_RecordEEG_Id", newName: "IX_RecordEEGId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.ParamEEGModels", name: "IX_RecordEEGId", newName: "IX_RecordEEG_Id");
            RenameColumn(table: "dbo.ParamEEGModels", name: "RecordEEGId", newName: "RecordEEG_Id");
        }
    }
}
