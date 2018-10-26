//#region Imports
// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Modules
import { AppRoutingModule } from '@modules/app-routing.module';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from '@components/app/app.component';
import { AdditionalComponent } from '@components/additional/additional.component';
import { ContactComponent } from '@components/contact/contact.component';
import { ReviewComponent } from '@components/review/review.component';
import { SubmitComponent } from '@components/submit/submit.component';
import { TestComponent } from '@components/test/test.component';
import { TestsComponent } from '@components/tests/tests.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    AdditionalComponent,
    ContactComponent,
    ReviewComponent,
    SubmitComponent,
    TestComponent,
    TestsComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
