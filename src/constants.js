import BacklogIcon from './assets/Backlog.svg';
import CancelledIcon from './assets/Cancelled.svg';
import DoneIcon from './assets/Done.svg';
import InProgressIcon from './assets/in-progress.svg';
import TodoIcon from './assets/To-do.svg';
import UrgentPriorityIconColour from './assets/SVG - Urgent Priority colour.svg';
import UrgentPriorityIconGrey from './assets/SVG - Urgent Priority grey.svg';
import HighPriorityIcon from './assets/Img - High Priority.svg';
import MediumPriorityIcon from './assets/Img - Medium Priority.svg';
import LowPriorityIcon from './assets/Img - Low Priority.svg';
import NoPriorityIcon from './assets/No-priority.svg';

export const GROUP_BY = {
  STATUS: 'status',
  USER: 'user',
  PRIORITY: 'priority'
};

export const SORT_BY = {
  PRIORITY: 'priority',
  TITLE: 'title'
};

export const PRIORITY_MAP = {
  5: { label: 'UrgentGrey', icon: UrgentPriorityIconGrey },
  4: { label: 'Urgent', icon: UrgentPriorityIconColour },
  3: { label: 'High', icon: HighPriorityIcon },
  2: { label: 'Medium', icon: MediumPriorityIcon },
  1: { label: 'Low', icon: LowPriorityIcon },
  0: { label: 'No Priority', icon: NoPriorityIcon }
};

export const STATUS_MAP = {
  'Backlog': { label: 'Backlog', icon: BacklogIcon },
  'Todo': { label: 'Todo', icon: TodoIcon },
  'In progress': { label: 'In Progress', icon: InProgressIcon },
  'Done': { label: 'Done', icon: DoneIcon },
  'Cancelled': { label: 'Cancelled', icon: CancelledIcon }
};

export const STATUS_ORDER = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
