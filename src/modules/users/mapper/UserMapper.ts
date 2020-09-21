import User from '../infra/typeorm/entities/User';

export default class UserMap {
  public static toDTO(user: User): any {
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };
  }
}
