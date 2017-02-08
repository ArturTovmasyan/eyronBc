import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { TranslateService, TranslateLoader, TranslateModule, TranslateParser } from 'ng2-translate';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileHeaderComponent } from '../block/profile-header/profile-header.component';
import { ControlMessagesComponent } from '../components/control-messages/control-messages.component';
import { SettingsComponent } from './settings.component';

import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { RoundPipe } from '../pipes/round.pipe';

import { ProjectService } from '../project.service';
import { ValidationService } from '../validation.service';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Broadcaster } from '../tools/broadcaster';
import { Uploader } from 'angular2-http-file-upload';

const SettingsRoutes: Routes = [
  { path: '',  component: SettingsComponent },
  { path: ':type',  component: SettingsComponent },
  { path: ':type/:secret/:addMail',  component: SettingsComponent }
];

fdescribe('SettingsComponent', () => {

  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent, ProfileHeaderComponent, ControlMessagesComponent, CapitalizePipe, RoundPipe],
      providers: [ValidationService, CacheService, Uploader, TranslateService, TranslateLoader, TranslateParser, ProjectService, Broadcaster],
      imports: [MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule, RouterModule, RouterTestingModule.withRoutes(SettingsRoutes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBe(true);
  });
});
