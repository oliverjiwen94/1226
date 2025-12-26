
import React from 'react';
import { 
  Lightbulb, Rocket, BookOpen, Layers, 
  Users, ShieldCheck, GraduationCap, 
  Award, PieChart, FileSearch, 
  CheckCircle, History, ListTodo, Briefcase
} from 'lucide-react';

export const NAVIGATION_STRUCTURE = [
  {
    tier: '创新驱动层',
    items: [
      { id: 'idea-contest', label: '创意大赛', icon: <Rocket size={18} /> },
      { id: 'creative-center', label: '创新创意中心', icon: <Lightbulb size={18} /> },
    ]
  },
  {
    tier: '规划与决策层',
    items: [
      { id: 'guide-forum', label: '指南论坛', icon: <BookOpen size={18} /> },
      { id: 'special-manage', label: '专项管理', icon: <Layers size={18} /> },
      { id: 'review-center', label: '科技委评审中心', icon: <ShieldCheck size={18} /> },
    ]
  },
  {
    tier: '核心执行层',
    items: [
      { id: 'research-proj', label: '科研项目', icon: <Briefcase size={18} /> },
      { id: 'phd-proj', label: '博士项目', icon: <GraduationCap size={18} /> },
      { id: 'partners', label: '参研单位', icon: <Users size={18} /> },
    ]
  },
  {
    tier: '成果与价值层',
    items: [
      { id: 'ip-manage', label: '知识产权', icon: <CheckCircle size={18} /> },
      { id: 'tech-awards', label: '科技奖项', icon: <Award size={18} /> },
    ]
  },
  {
    tier: '监控与反馈层',
    items: [
      { id: 'tech-eval', label: '科技考核', icon: <PieChart size={18} /> },
      { id: 'stats-query', label: '统计查询', icon: <FileSearch size={18} /> },
      { id: 'feedback', label: '项目反馈', icon: <History size={18} /> },
      { id: 'todos', label: '待办事项', icon: <ListTodo size={18} /> },
    ]
  }
];

export const MOCK_PROJECTS = [
  { 
    id: 'KD1-094', 
    name: 'XXXX', 
    budget: 100.08, 
    research: 100, 
    result: 100, 
    archive: 100, 
    cycle: '2012-01-01 - 2016-06-30',
    stage: 'Approved' as const,
    progress: 100,
    type: 'External' as const,
    lastUpdated: '2016-06-30'
  },
  { 
    id: 'KD1-110', 
    name: 'XXXX', 
    budget: 209.66, 
    research: 100, 
    result: 100, 
    archive: 100, 
    cycle: '2013-01-01 - 2016-12-31',
    stage: 'Approved' as const,
    progress: 100,
    type: 'External' as const,
    lastUpdated: '2016-12-31'
  },
  { 
    id: 'KD1-111', 
    name: 'XXXX', 
    budget: 115.78, 
    research: 100, 
    result: 100, 
    archive: 100, 
    cycle: '2013-01-01 - 2015-12-31',
    stage: 'Approved' as const,
    progress: 100,
    type: 'Internal' as const,
    lastUpdated: '2015-12-31'
  },
  { 
    id: 'KD1-115', 
    name: 'XXXX', 
    budget: 124.02, 
    research: 100, 
    result: 100, 
    archive: 100, 
    cycle: '2013-05-01 - 2016-12-31',
    stage: 'Reviewing' as const,
    progress: 95,
    type: 'Internal' as const,
    lastUpdated: '2024-05-12'
  },
  { 
    id: 'KD1-117', 
    name: 'XXXX', 
    budget: 0, 
    research: 0, 
    result: 0, 
    archive: 0, 
    cycle: '2013-07-01 - 2015-12-01',
    stage: 'Drafting' as const,
    progress: 15,
    type: 'Internal' as const,
    lastUpdated: '2023-10-05'
  },
];

export const MOCK_ACTIVITIES = [
  { id: 'act-1', type: 'Project' as const, title: '深海采矿车项目节点验收通过', timestamp: '2小时前', user: '李工程', status: 'Success' },
  { id: 'act-2', type: 'IP' as const, title: '一种新型压载水处理装置专利授权', timestamp: '5小时前', user: '知识产权部', status: 'Approved' },
  { id: 'act-3', type: 'Award' as const, title: '荣获2024年度海洋工程技术特等奖', timestamp: '昨天', user: '科技委', status: 'Completed' },
  { id: 'act-4', type: 'Task' as const, title: '待办事项：提交年度经费预算报告', timestamp: '前天', user: '财务部', status: 'Pending' },
];

export const COCKPIT_KPI_DATA = [
  { label: '总经费(亿)', value: 109.79 },
  { label: '其中国拨(亿)', value: 56.47 },
  { label: '总项目数(项)', value: 207 },
  { label: '主研(项)', value: 5 },
  { label: '参研(项)', value: 202 },
  { label: '在研项目(项)', value: 53 },
  { label: '结题(项)', value: 116 },
  { label: '待验收(项)', value: 36 },
];

export const MOCK_EXCEPTIONS = [
  { id: 'KD1-293', name: 'XXXX', plan: 0, budget: 6 },
  { id: 'KD2-024', name: 'XXXX', plan: 0, budget: 6 },
];

export const PARTNER_RANKING = [
  { name: '611所', value: 50 },
  { name: '上海交大', value: 32 },
  { name: '综合院', value: 29 },
  { name: '哈工程', value: 24 },
  { name: '邮轮科技', value: 17 },
  { name: '716所', value: 14 },
  { name: '708所', value: 14 },
  { name: '江南所', value: 13 },
  { name: '武汉理工', value: 12 },
  { name: '702所', value: 12 },
];
