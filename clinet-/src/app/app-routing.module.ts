import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./components/pages/about-us/about-us.component";
import { BlogDetailsComponent } from "./components/pages/blog-details/blog-details.component";
import { ContactUsComponent } from "./components/pages/contact-us/contact-us.component";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { SignupComponent } from "./components/pages/signup/signup.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { CreateOfferComponent } from "./components/pages/create-offer/create-offer.component";
import { ListJobsComponent } from "./components/pages/list-jobs/list-jobs.component";
import { JobDetailsComponent } from "./components/pages/job-details/job-details.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";

// ====== Guards ======
import { AuthGuard } from "./guard/auth.guard";
import { CreateOfferGuard } from "./guard/create-offer.guard";
import { DashboardGuard } from "./guard/dashboard.guard";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "about-us", component: AboutUsComponent },
    { path: "jobs", component: ListJobsComponent },
    { path: "blog-details", component: BlogDetailsComponent },
    { path: "contact-us", component: ContactUsComponent },
    { path: "login", component: LoginComponent , canActivate: [AuthGuard]},
    { path: "signup", component: SignupComponent, canActivate: [AuthGuard] },
    { path: 'create-offer', component: CreateOfferComponent, canActivate: [AuthGuard, CreateOfferGuard] },
    { path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard,DashboardGuard] },
    { path: "job-details/:id", component: JobDetailsComponent },
    { path: "**", component: NotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
