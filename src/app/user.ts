export class User {
  id: number;
  email: string;
  name: string;
  active: boolean;
  alias: string;
  chat_only: boolean;
  created_at: any; //date
  custom_role_id: number;
  details: string;
  external_id: string;
  last_login_at: any; //date
  locale: string;
  locale_id: number;
  moderator: boolean;
  notes: string;
  only_private_comments: boolean;
  organization_id: number;
  default_group_id: number;
  phone: string;
  photo: any;
  restricted_agent: boolean;
  role: string;
  shared: boolean;
  shared_agent: boolean;
  signature: string;
  suspended: boolean;
  tags: any[];
  ticket_restriction: string;
  time_zone: string;
  two_factor_auth_enabled: boolean;
  updated_at: any; //date
  url: string;
  user_fields: any;
  verified: boolean;
}
