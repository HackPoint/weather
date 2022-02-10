import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, switchMap, tap } from 'rxjs';
import { MatSnackBarDismiss } from '@angular/material/snack-bar/snack-bar-ref';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'weather';

  constructor(private readonly updates: SwUpdate, private readonly snackbar: MatSnackBar) {
  }
  ngOnInit(): void {

    this.updates.versionUpdates
      .pipe(
        switchMap(
          () => this.snackbar.open('A new version is available!', 'Update now')
            .afterDismissed()
        ),
        filter((result: MatSnackBarDismiss) => result.dismissedByAction),
        tap(() => this.updates.activateUpdate().then(() => {
          location.reload();
        }))
      ).subscribe();
  }


}
