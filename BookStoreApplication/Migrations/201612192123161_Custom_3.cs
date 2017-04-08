namespace BookStoreApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Custom_3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RecordEEGs", "Date", c => c.DateTime(nullable: false));
            AddColumn("dbo.RecordEEGs", "Result", c => c.Boolean(nullable: false));
            DropColumn("dbo.RecordEEGs", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RecordEEGs", "Name", c => c.String());
            DropColumn("dbo.RecordEEGs", "Result");
            DropColumn("dbo.RecordEEGs", "Date");
        }
    }
}
