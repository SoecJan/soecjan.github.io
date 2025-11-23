import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-darkmode-toggle',
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './darkmode-toggle.component.html',
  styleUrl: './darkmode-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DarkmodeToggleComponent { 

    toggleDarkmode() {
        const element = document.getElementsByTagName("html")[0] as HTMLElement;
        if (element.classList.contains('darkmode')) {
            element.classList.remove('darkmode');
            element.classList.add('lightmode');
        } else {
            element.classList.add('darkmode');
            element.classList.remove('lightmode');
        }
    }
}