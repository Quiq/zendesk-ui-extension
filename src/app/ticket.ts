export class Ticket {
  id: number;
  url: string;
  external_id: string;
  type: string;
  subject: string;
  raw_subject: string;
  description: string;
  priority: string;
  status: string;
  recipient: string;
  requester_id: number;
  submitter_id: number;
  assignee_id: number;
  organization_id: number;
  group_id: number;
  collaborator_ids: any[];
  forum_topic_id: number;
  problem_id: number;
  has_incidents: boolean;
  due_at: any; // date format
  tags: any[];
  via: any;
  custom_fields: any[];
  satisfaction_rating: any;
  sharing_agreement_ids: any[];
  followup_ids: any[];
  ticket_form_id: number;
  brand_id: number;
  allow_channelback: boolean;
  is_public: boolean;
  created_at: any; //date
  updated_at: any; //date
}
