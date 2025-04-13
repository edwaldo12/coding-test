type Deal = {
  client: string;
  value: number;
  status: 'Closed Won' | 'In Progress' | 'Closed Lost';
};

type Client = {
  name: string;
  industry: string;
  contact: string;
};

export type SalesRep = {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Deal[];
  clients: Client[];
};

export type SalesRepsData = {
  salesReps: SalesRep[];
  total: number;
};
