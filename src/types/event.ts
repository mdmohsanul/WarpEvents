export interface EventType {
  _id: string;
  title: string;
  description?: string;
  date: string; 
  location: string;
  attendees: string[]; 
  createdBy: string;
}
type Attendees={
  _id:string;
  name:string;
  email:string
}
export type EventDetails = {
  title: string;
  description: string;
  location: string;
  date: string;
  attendees: Attendees[]; 
  createdBy: {
    _id: string;
    email: string;
    name: string;
  };
};
