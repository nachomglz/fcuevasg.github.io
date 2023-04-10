export interface IGridBreakpoints {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;

  [P: string]: number;
}

export enum DAILYSTATES {
  none = 0,
  OK = 1,
  NEEDSHELP = 2,
  BLOCKED = 3
}

export interface DailyData {
  status: DAILYSTATES,
  time: number
}

export interface TeamMember {
  name: string,
  email?: string,
  dailyData: {
    [key: number]: DailyData;
  }
}

export interface MongoObjectId {
  $oid: string
}

export interface User {
  _id?: MongoObjectId,
  name: string,
  email: string,
}

export interface Team {
  _id?: MongoObjectId,
  name: string,
  users: Array<User>
}

export type MeetingType = "RETRO" | "DAILY"

export interface MeetingConfig {
  _id: MongoObjectId
  team_id?: MongoObjectId,
  team_id_str?: MongoObjectId,
  desired_duration: number,
  config_name: string,
  description: string,
  meeting_type: MeetingType,
}

