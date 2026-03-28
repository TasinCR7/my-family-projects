export interface FamilyMember {
  id: string;
  name: string;
  nameEn: string;
  relation: string;
  age: number;
  phone: string;
  email: string;
  avatar: string;
  successRate: number;
  tasksCompleted: number;
  tasksTotal: number;
}

export interface Plan {
  id: string;
  title: string;
  assignedTo: string;
  startDate: string;
  deadline: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

export interface Expense {
  id: string;
  amount: number;
  date: string;
  category: string;
  paidBy: string;
  description: string;
}

export const familyMembers: FamilyMember[] = [
  { id: '1', name: 'আব্দুল গফুর', nameEn: 'Abdul Gafur', relation: 'পিতা', age: 75, phone: '+8801700000000', email: 'gafur@family.com', avatar: '', successRate: 100, tasksCompleted: 50, tasksTotal: 50 },
  { id: '2', name: 'জাফর আহমেদ', nameEn: 'Zafar Ahmed', relation: 'ছেলে', age: 50, phone: '+8801710000000', email: 'zafar@family.com', avatar: '', successRate: 85, tasksCompleted: 15, tasksTotal: 20 },
  { id: '3', name: 'মোজাফফর আহমেদ', nameEn: 'Mozaffar Ahmed', relation: 'ছেলে', age: 48, phone: '+8801720000000', email: 'mozaffar@family.com', avatar: '', successRate: 78, tasksCompleted: 12, tasksTotal: 18 },
  { id: '4', name: 'আব্দুর রউফ', nameEn: 'Abdur Rouf', relation: 'ছেলে', age: 45, phone: '+8801730000000', email: 'rouf@family.com', avatar: '', successRate: 92, tasksCompleted: 20, tasksTotal: 25 },
  { id: '5', name: 'মোহাম্মদ মুজিবুর রহমান', nameEn: 'Mohammad Mujibur Rahman', relation: 'ছেলে', age: 42, phone: '+8801740000000', email: 'mujibur@family.com', avatar: '', successRate: 88, tasksCompleted: 14, tasksTotal: 17 },
  { id: '6', name: 'আবু তৈয়ব', nameEn: 'Abu Tayeb', relation: 'ছেলে', age: 38, phone: '+8801750000000', email: 'tayeb@family.com', avatar: '', successRate: 95, tasksCompleted: 18, tasksTotal: 20 },
  { id: '7', name: 'রওশন আরা', nameEn: 'Rowshan Ara', relation: 'মেয়ে', age: 52, phone: '+8801760000000', email: 'rowshan@family.com', avatar: '', successRate: 90, tasksCompleted: 10, tasksTotal: 11 },
  { id: '8', name: 'মুন্নী', nameEn: 'Munni', relation: 'মেয়ে', age: 46, phone: '+8801770000000', email: 'munni@family.com', avatar: '', successRate: 82, tasksCompleted: 9, tasksTotal: 12 },
  { id: '9', name: 'হাসনারা বেগম লাকি', nameEn: 'Hasnara Begum Lucky', relation: 'মেয়ে', age: 40, phone: '+8801780000000', email: 'hasnara@family.com', avatar: '', successRate: 88, tasksCompleted: 11, tasksTotal: 13 },
];

export const plans: Plan[] = [
  { id: '1', title: 'জমির দলিল সংগ্রহ', assignedTo: '1', startDate: '2026-01-01', deadline: '2026-03-30', category: 'জমি', status: 'in-progress' },
  { id: '2', title: 'পারিবারিক সভা আয়োজন', assignedTo: '2', startDate: '2026-03-15', deadline: '2026-04-01', category: 'ইভেন্ট', status: 'pending' },
  { id: '3', title: 'বাড়ি মেরামত', assignedTo: '3', startDate: '2026-02-01', deadline: '2026-02-28', category: 'রক্ষণাবেক্ষণ', status: 'completed' },
  { id: '4', title: 'শিক্ষা তহবিল গঠন', assignedTo: '4', startDate: '2026-01-15', deadline: '2026-06-30', category: 'আর্থিক', status: 'in-progress' },
  { id: '5', title: 'পারিবারিক গাছ আপডেট', assignedTo: '5', startDate: '2026-03-01', deadline: '2026-03-31', category: 'পরিবার', status: 'completed' },
];

export const expenses: Expense[] = [
  { id: '1', amount: 50000, date: '2026-03-01', category: 'জমি', paidBy: '1', description: 'জমি জরিপ খরচ' },
  { id: '2', amount: 25000, date: '2026-03-05', category: 'মেরামত', paidBy: '3', description: 'বাড়ি মেরামত' },
  { id: '3', amount: 15000, date: '2026-03-10', category: 'শিক্ষা', paidBy: '4', description: 'টিউশন ফি' },
  { id: '4', amount: 8000, date: '2026-03-12', category: 'চিকিৎসা', paidBy: '2', description: 'ডাক্তার খরচ' },
  { id: '5', amount: 35000, date: '2026-03-20', category: 'আইনি', paidBy: '1', description: 'উকিল ফি' },
];

export const dashboardStats = {
  totalPlans: 25,
  successfulPlans: 20,
  yearlyExpenses: 533000,
  landResolution: 65,
  topPerformer: 'আয়েশা খাতুন',
};
