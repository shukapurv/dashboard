export interface DataItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Department {
  department: string;
  sub_departments: string[];
}

export interface Props {
  departments: Department[];
}

