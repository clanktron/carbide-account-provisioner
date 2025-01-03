/// <reference types="vite/client" />

// example RobotCreate
//
// {
//   "permissions": [
//     {
//       "access": [
//         {
//           "resource": "registry",
//           "action": "read"
//         }
//       ],
//       "kind": "system",
//       "namespace": "/"
//     }
//   ],
//   "name": "another-test",
//   "description": "testing description yahoo",
//   "duration": 45,
//   "disable": false,
//   "level": "system"
// }

// the following types were auto-generated using ng-swagger-gen in the goharbor/harbor project @ commit a548ab705f8cb713ad0e4a9fb4e55c8b80237ac8
export interface Robot {

  /**
   * The ID of the robot
   */
  id?: number;

  /**
   * The name of the robot
   */
  name?: string;

  /**
   * The description of the robot
   */
  description?: string;

  /**
   * The secret of the robot
   */
  secret?: string;

  /**
   * The level of the robot, project or system
   */
  level?: string;

  /**
   * The duration of the robot in days, duration must be either -1(Never) or a positive integer
   */
  duration?: null | number;

  /**
   * The editable status of the robot
   */
  editable?: boolean;

  /**
   * The disable status of the robot
   */
  disable?: boolean;

  /**
   * The expiration date of the robot
   */
  expires_at?: number;
  permissions?: Array<RobotPermission>;

  /**
   * The type of the robot creator, like local(harbor_user) or robot.
   */
  creator_type?: string;

  /**
   * The reference of the robot creator, like the id of harbor user.
   */
  creator_ref?: number;

  /**
   * The creation time of the robot.
   */
  creation_time?: string;

  /**
   * The update time of the robot.
   */
  update_time?: string;
}

export interface RobotCreate {

  /**
   * The name of the robot
   */
  name?: string;

  /**
   * The description of the robot
   */
  description?: string;

  /**
   * The secret of the robot
   */
  secret?: string;

  /**
   * The level of the robot, project or system
   */
  level?: string;

  /**
   * The disable status of the robot
   */
  disable?: boolean;

  /**
   * The duration of the robot in days, duration must be either -1(Never) or a positive integer
   */
  duration?: number;
  permissions?: Array<RobotPermission>;
}

export interface RobotPermission {

  /**
   * The kind of the permission
   */
  kind?: string;

  /**
   * The namespace of the permission
   */
  namespace?: string;
  access?: Array<Access>;
}

export interface Access {

  /**
   * The resource of the access. Possible resources are listed here for system and project level https://github.com/goharbor/harbor/blob/main/src/common/rbac/const.go
   */
  resource?: string;

  /**
   * The action of the access. Possible actions are *, pull, push, create, read, update, delete, list, operate, scanner-pull and stop.
   */
  action?: string;

  /**
   * The effect of the access
   */
  effect?: string;
}
