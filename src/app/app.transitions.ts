import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
export const detailsAnimation = trigger('detailsAnimation', [
  transition('* => DETAILS', [
    style({transform: 'translateX(100%)'}),
    animate('250ms ease-in', style({transform: 'translateX(0%)'}))
  ]),
    transition('DETAILS => RESULTS', [
      animate('250ms ease-in', style({transform: 'translateX(100%)'}))
    ])])
export const resultsAnimation = trigger('resultsAnimation', [

  transition('* => RESULTS', [
    style({transform: 'translateX(-100%)'}),
    animate('250ms ease-in', style({transform: 'translateX(0%)'}))
  ]),
  transition('RESULTS => DETAILS', [
    animate('250ms ease-in', style({transform: 'translateX(-100%)'}))
  ])])


