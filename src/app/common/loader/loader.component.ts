import { Component, OnInit } from '@angular/core'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { LoaderService } from './loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})

export class LoaderComponent implements OnInit {

  loadertype: string[] = [
    'ball-atom',
    'ball-beat',
    'ball-circus',
    'ball-climbing-dot',
    'ball-clip-rotate-multiple',
    'ball-clip-rotate-pulse',
    'ball-elastic-dots',
    'ball-fussion',
    'ball-newton-cradle',
    'ball-running-dots',
    'ball-rotate',
    'ball-pulse-rise',
    'ball-spin',
    'ball-scale-ripple-multiple',
    'ball-spin-clockwise',
    'ball-spin-clockwise-fade-rotating',
    'ball-spin-fade-rotating',
    'ball-triangle-path',
    'ball-zig-zag',
    'fire',
    'line-spin-clockwise-fade-rotating',
    'pacman',
    'square-jelly-box',
    'square-spin',
    'timer',
    'triangle-skew-spin',
  ]
  rnd: number

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.ChangeSpinnerType()
    this.loaderService.isLoading.pipe(debounceTime(200), distinctUntilChanged()).subscribe((showHideBoolean) => showHideBoolean ? this.loaderService.show() : this.loaderService.hide())
  }

  ChangeSpinnerType() { this.rnd = Math.floor(Math.random() * this.loadertype.length) }
}
