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
  { id: '1', name: 'আব্দুল করিম', nameEn: 'Abdul Karim', relation: 'বড় ছেলে', age: 55, phone: '+880171XXXXXXX', email: 'karim@family.com', avatar: '', successRate: 85, tasksCompleted: 17, tasksTotal: 20 },
  { id: '2', name: 'আব্দুল হালিম', nameEn: 'Abdul Halim', relation: 'মেজো ছেলে', age: 50, phone: '+880172XXXXXXX', email: 'halim@family.com', avatar: '', successRate: 78, tasksCompleted: 14, tasksTotal: 18 },
  { id: '3', name: 'আব্দুল রহিম', nameEn: 'Abdul Rahim', relation: 'সেজো ছেলে', age: 45, phone: '+880173XXXXXXX', email: 'rahim@family.com', avatar: '', successRate: 92, tasksCompleted: 23, tasksTotal: 25 },
  { id: '4', name: 'ফাতেমা বেগম', nameEn: 'Fatema Begum', relation: 'বড় মেয়ে', age: 48, phone: '+880174XXXXXXX', email: 'fatema@family.com', avatar: '', successRate: 88, tasksCompleted: 15, tasksTotal: 17 },
  { id: '5', name: 'আয়েশা খাতুন', nameEn: 'Ayesha Khatun', relation: 'ছোট মেয়ে', age: 42, phone: '+880175XXXXXXX', email: 'ayesha@family.com', avatar: '', successRate: 95, tasksCompleted: 19, tasksTotal: 20 },
  { id: '6', name: 'মোহাম্মদ সাইফ', nameEn: 'Mohammad Saif', relation: 'নাতি', age: 28, phone: '+880176XXXXXXX', email: 'saif@family.com', avatar: '', successRate: 70, tasksCompleted: 7, tasksTotal: 10 },
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
