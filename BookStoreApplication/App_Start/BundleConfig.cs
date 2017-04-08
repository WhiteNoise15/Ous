using System.Web.Optimization;

namespace BookStoreApplication
{
    //
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/lib/angular.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/route").Include(
                        "~/Scripts/lib/angular-route.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/locale").Include(
                        "~/Scripts/lib/angular-locale_ru-ru.js"));

            bundles.Add(new ScriptBundle("~/bundles/local-storage").Include(
                        "~/Scripts/lib/angular-local-storage.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/file-upload").Include(
                        "~/Scripts/lib/angular-file-upload.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/loading-bar").Include(
                        "~/Scripts/lib/loading-bar.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/js/appMain.js",
                        "~/Scripts/js/auth/auth.js",
                        "~/Scripts/js/record/record.js",
                        "~/Scripts/js/auth/factory.js",
                        "~/Scripts/js/record/factory.js",
                        "~/Scripts/js/controllerMain.js",
                        "~/Scripts/js/auth/controller.js",
                        "~/Scripts/js/record/controller.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/lib/bootstrap.min.css",
                      "~/Content/lib/loading-bar.css",
                      "~/Content/lib/font-awesome/css/font-awesome.css",
                      "~/Content/css/content.css",
                      "~/Content/css/sidebar.css"));
        }
    }
}
