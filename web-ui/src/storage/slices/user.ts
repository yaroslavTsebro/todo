import { _allowStateChangesInsideComputed } from 'mobx';
import { Persisted, Store } from '../../shared/decorators';
import { User } from '../../openapi/models/User';
import { authApi, userApi } from '../../api';
import router from '../../router';

export interface IAuthPayload {
  sub: string;
  email: string;
  workspaceId: number;
  projectId: number;
}

@Store()
class UserStore {
  user!: User;

  @Persisted()
  _accessToken!: string;

  get accessToken(): string {
    return this._accessToken;
  }

  get authPayload(): IAuthPayload {
    const json = this.accessToken !== null
      ? atob(this.accessToken.split('.')[1])
      : '{}';

    return JSON.parse(json);
  }

  constructor() {
    if (this.accessToken === null) {
      router.navigate('/signin');
    }
  }

  setAccessToken(accessToken: string): void {
    this._accessToken = accessToken;
  }

  setUser(user: User) {
    this.user = user;
  }

  async getUser() {
    const response = await userApi.userControllerGetUser();
    this.setUser(response);
  }

  changeWorkspace(workspaceId: number): Promise<void> {
    return authApi.authControllerChangeMyWorkspace({
      changeWorkspaceDto: {
        workspaceId,
      }
    })
      .then(data => data.accessToken)
      .then(this.setAccessToken.bind(this));
  }
}

export default UserStore;
