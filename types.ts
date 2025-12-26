
import React from 'react';

export interface KPIData {
  label: string;
  value: number;
  total: number;
  unit: string;
  trend: 'up' | 'down';
  percentage: number;
}

export interface ProjectStatus {
  id: string;
  name: string;
  stage: 'Drafting' | 'Submitting' | 'Approved' | 'Reviewing' | 'Archiving';
  progress: number;
  type: 'Internal' | 'External';
  lastUpdated: string;
}

export interface ActivityEvent {
  id: string;
  type: 'Project' | 'IP' | 'Award' | 'Task';
  title: string;
  timestamp: string;
  user: string;
  status: string;
}

export type NavTier = 'Innovation' | 'Planning' | 'Execution' | 'Value' | 'Governance';

export interface NavItem {
  id: string;
  label: string;
  tier: NavTier;
  icon: React.ReactNode;
}