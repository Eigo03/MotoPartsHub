using System.Data.Entity;
using MotoPartsHub.Models.Tables;
using MotoPartsHub.Models.Maps;

namespace MotoPartsHub.Models.Context
{
    public class MotoContext : DbContext
    {
        static MotoContext()
        {
            Database.SetInitializer<MotoContext>(null);
        }

        public MotoContext() : base("Name=motopartshub") { }

        public virtual DbSet<roles_model> roles { get; set; }
        public virtual DbSet<users_model> users { get; set; }
        public virtual DbSet<shops_model> shops { get; set; }
        public virtual DbSet<categories_model> categories { get; set; }
        public virtual DbSet<parts_model> parts { get; set; }
        public virtual DbSet<part_specs_model> part_specs { get; set; }
        public virtual DbSet<part_features_model> part_features { get; set; }
        public virtual DbSet<inquiries_model> inquiries { get; set; }
        public virtual DbSet<stock_logs_model> stock_logs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new roles_map());
            modelBuilder.Configurations.Add(new users_map());
            modelBuilder.Configurations.Add(new shops_map());
            modelBuilder.Configurations.Add(new categories_map());
            modelBuilder.Configurations.Add(new parts_map());
            modelBuilder.Configurations.Add(new part_specs_map());
            modelBuilder.Configurations.Add(new part_features_map());
            modelBuilder.Configurations.Add(new inquiries_map());
            modelBuilder.Configurations.Add(new stock_logs_map());
        }
    }
}