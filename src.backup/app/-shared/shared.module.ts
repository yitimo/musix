import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';
import { IconDirective } from './directives/icon.directive';
import { ArtistPipe } from './pipes/artist.pipe';
import { LimitPipe } from './pipes/limit.pipe';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
    declarations: [
        IconDirective, ArtistPipe, LimitPipe,
        TimestampPipe, PaginationComponent
    ],
    imports: [
        CommonModule, MatTooltipModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        IconDirective,
        ArtistPipe,
        LimitPipe,
        TimestampPipe,
        PaginationComponent,
        MatTooltipModule
    ],
    providers: [],
    entryComponents: []
})
export class SharedModule {}
