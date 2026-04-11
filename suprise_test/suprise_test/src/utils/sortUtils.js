// Sorting utilities for complaints
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  TITLE_ASC: 'title_asc',
  TITLE_DESC: 'title_desc',
  PRIORITY_HIGH: 'priority_high',
  PRIORITY_LOW: 'priority_low',
  STATUS: 'status',
};

export function sortComplaints(complaints, sortBy) {
  const sorted = [...complaints];

  switch (sortBy) {
    case SORT_OPTIONS.NEWEST:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    case SORT_OPTIONS.OLDEST:
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    case SORT_OPTIONS.TITLE_ASC:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case SORT_OPTIONS.TITLE_DESC:
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case SORT_OPTIONS.PRIORITY_HIGH:
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return sorted.sort((a, b) => (priorityOrder[a.priority] || 999) - (priorityOrder[b.priority] || 999));

    case SORT_OPTIONS.PRIORITY_LOW:
      const reversePriorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
      return sorted.sort((a, b) => (reversePriorityOrder[a.priority] || 999) - (reversePriorityOrder[b.priority] || 999));

    case SORT_OPTIONS.STATUS:
      const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Resolved': 3 };
      return sorted.sort((a, b) => (statusOrder[a.status] || 999) - (statusOrder[b.status] || 999));

    default:
      return sorted;
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
