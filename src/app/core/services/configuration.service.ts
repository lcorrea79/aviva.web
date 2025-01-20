/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**************************************************************************************
 * Core Services, Utilities and Enviroments Imports
 *************************************************************************************/
import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-keys';
import { Utilities } from './utilities';
import { environment } from '../../../environments/environment';


interface UserConfiguration {
  language: string;
  themeId: number;
  showDashboardTodo: boolean;
}

@Injectable()
export class ConfigurationService {

  constructor(private localStorage: LocalStoreManager) {
    this._globalLanguage = this.localStorage.getDataObject<string>(DBkeys.GLOBAL_LANGUAGE);
    this.loadLocalChanges();
  }

  set language(value: string) {
    this._language = value;
    this.saveToLocalStore(value, DBkeys.LANGUAGE);
  }
  get language() {
    return this._language || ConfigurationService.defaultLanguage;
  }

  set globalLanguage(value: string) {
    this._globalLanguage = value;
    this.saveToLocalStore(value, DBkeys.GLOBAL_LANGUAGE);
  }
  get globalLanguage() {
    return this._globalLanguage;
  }

  set themeId(value: number) {
    value = +value;
    this._themeId = value;
    this.saveToLocalStore(value, DBkeys.THEME_ID);
  }
  get themeId() {
    return this._themeId || ConfigurationService.defaultThemeId;
  }

  set showDashboardTodo(value: boolean) {
    this._showDashboardTodo = value;
    this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_TODO);
  }
  get showDashboardTodo() {
    return this._showDashboardTodo != null ? this._showDashboardTodo : ConfigurationService.defaultShowDashboardTodo;
  }

   public static readonly appVersion: string = '7.0.0';

  // ***Specify default configurations here***
  public static readonly defaultLanguage: string = 'en';
  public static readonly defaultHomeUrl: string = '/';
  public static readonly defaultThemeId: number = 1; // 0: Dark / 1: Light
  public static readonly defaultShowDashboardTodo: boolean = false;

  public baseUrl = environment.baseUrl || Utilities.baseUrl();
  public loginUrl = environment.loginUrl;
  public fallbackBaseUrl = 'https://localhost:4200';
  // ***End of defaults***

  private _language: string = null;
  private _globalLanguage: string = null;
  private _themeId: number = null;
  private _showDashboardTodo: boolean = null;
  private onConfigurationImported: Subject<void> = new Subject<void>();

  configurationImported$ = this.onConfigurationImported.asObservable();

  private loadLocalChanges() {
    if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_TODO)) {
      this._showDashboardTodo = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_TODO);
    }
  }

  private saveToLocalStore(data: any, key: string) {
    setTimeout(() => this.localStorage.savePermanentData(data, key));
  }

  public import(jsonValue: string) {
    this.clearLocalChanges();

    if (jsonValue) {
      const importValue: UserConfiguration = Utilities.JsonTryParse(jsonValue);

      if (importValue.language != null) {
        this.language = importValue.language;
      }

      if (importValue.themeId != null) {
        this.themeId = +importValue.themeId;
      }

      if (importValue.showDashboardTodo != null) {
        this.showDashboardTodo = importValue.showDashboardTodo;
      }
    }

    this.onConfigurationImported.next();
  }

  public export(changesOnly = true): string {
    const exportValue: UserConfiguration = {
      language: changesOnly ? this._language : this.language,
      themeId: changesOnly ? this._themeId : this.themeId,
      showDashboardTodo: changesOnly ? this._showDashboardTodo : this.showDashboardTodo
    };

    return JSON.stringify(exportValue);
  }

  public clearLocalChanges() {
    this._language = null;
    this._themeId = null;
    this._showDashboardTodo = null;

    this.localStorage.deleteData(DBkeys.LANGUAGE);
    this.localStorage.deleteData(DBkeys.THEME_ID);
    this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_TODO);

    this.resetTheme();
    this.clearUserConfigKeys();
  }

  private resetTheme() {
    this.setTheme();
  }

  private addKeyToUserConfigKeys(configKey: string) {
    const configKeys = this.localStorage.getDataObject<string[]>(DBkeys.USER_CONFIG_KEYS) ?? [];

    if (!configKeys.includes(configKey)) {
      configKeys.push(configKey);
      this.localStorage.savePermanentData(configKeys, DBkeys.USER_CONFIG_KEYS);
    }
  }

  private clearUserConfigKeys() {
    const configKeys = this.localStorage.getDataObject<string[]>(DBkeys.USER_CONFIG_KEYS);

    if (configKeys != null && configKeys.length > 0) {
      for (let key of configKeys) {
        this.localStorage.deleteData(key);
      }

      this.localStorage.deleteData(DBkeys.USER_CONFIG_KEYS);
    }
  }

  public saveConfiguration(data: any, configKey: string) {
    this.addKeyToUserConfigKeys(configKey);
    this.localStorage.savePermanentData(data, configKey)
  }

  public getConfiguration<T>(configKey: string, isDateType = false): T {
    return this.localStorage.getDataObject<T>(configKey, isDateType);
  }

  public setTheme() {
    
  }
}
