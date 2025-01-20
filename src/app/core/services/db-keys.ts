/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Injectable } from '@angular/core';

@Injectable()
export class DBkeys {

  public static readonly CURRENT_USER = 'current_user';
  public static readonly USER_PERMISSIONS = 'user_permissions';
  public static readonly ACCESS_TOKEN = 'access_token';
  public static readonly REFRESH_TOKEN = 'refresh_token';
  public static readonly TOKEN_EXPIRES_IN = 'expires_in';

  public static readonly PORTAL_TOKEN = 'portal_token';

  public static readonly REMEMBER_ME = 'remember_me';

  public static readonly LANGUAGE = 'language';
  public static readonly GLOBAL_LANGUAGE = 'global_language';  
  public static readonly THEME_ID = 'themeId';  
  public static readonly SHOW_DASHBOARD_TODO = 'show_dashboard_todo';

  public static readonly USER_CONFIG_KEYS = 'user_config_keys';
}
