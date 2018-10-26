//#region Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from '@components/contact/contact.component';
import { TestComponent } from '@components/test/test.component';
import { TestsComponent } from '@components/tests/tests.component';
import { AdditionalComponent } from '@components/additional/additional.component';
import { ReviewComponent } from '@components/review/review.component';
import { SubmitComponent } from '@components/submit/submit.component';
//#endregion

const routes: Routes = [
  { path: '', redirectTo: 'ContactComponent', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'test', component: TestComponent },
  { path: 'test/:num', component: TestComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'additional', component: AdditionalComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'submit', component: SubmitComponent },
  { path: '**', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
