export namespace IForm {
  export type IUserSettings = {
    username: string;
  };
}

export namespace IEntity {
  export interface UserSettingsModal {
    photoUrl: string;
    username: string;
  }
}

export namespace IApi {
  export interface Request {
    username: string;
    photo_url: string;
  }
  export interface Response {
    username: string;
    photo_url: string;
  }
}
