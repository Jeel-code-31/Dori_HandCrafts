/**
 * Login & Auth Management Module
 * Contains strict Admin-only fixed credential verification and MOQ button click tracking.
 */

export interface FixedUser {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'ADMIN';
  userCountIndex: number;
}

export interface ClickRecord {
  id: string; // Click ID, e.g. "CLK-1", "CLK-2", "CLK-3"
  clickNumber: number; // 1, 2, 3, etc.
  userCount: number; // Total user count at time of click
  buttonId: string; // Button identifier (e.g. "MOQ Button")
  productName?: string;
  userId: string;
  userName: string;
  userEmail: string;
  timestamp: string;
}

// STRICT ADMIN-ONLY FIXED CREDENTIALS (NO OTHER USERS ALLOWED)
export const FIXED_ADMIN_CREDENTIAL = {
  username: 'Jeel darji',
  email: 'Jeel@2004',
  password: 'darjijeel31',
  name: 'Jeel darji',
  role: 'ADMIN' as const,
  userCountIndex: 1,
};

/**
 * Validates login against strict Admin fixed credentials ONLY.
 * Any other username or password is strictly rejected.
 */
export function verifyFixedCredentials(usernameOrEmail: string, password: string): {
  success: boolean;
  user?: FixedUser;
  message?: string;
} {
  const normalizedInput = usernameOrEmail.trim().toLowerCase();
  const isAdminMatch =
    (normalizedInput === FIXED_ADMIN_CREDENTIAL.username.toLowerCase() ||
      normalizedInput === FIXED_ADMIN_CREDENTIAL.email.toLowerCase()) &&
    password === FIXED_ADMIN_CREDENTIAL.password;

  if (isAdminMatch) {
    return {
      success: true,
      user: {
        id: FIXED_ADMIN_CREDENTIAL.email,
        email: FIXED_ADMIN_CREDENTIAL.email,
        username: FIXED_ADMIN_CREDENTIAL.username,
        name: FIXED_ADMIN_CREDENTIAL.name,
        role: FIXED_ADMIN_CREDENTIAL.role,
        userCountIndex: FIXED_ADMIN_CREDENTIAL.userCountIndex,
      },
    };
  }

  return {
    success: false,
    message: 'Access Denied: Only Admin can log in. Invalid Username or Password.',
  };
}

// Key names for local storage tracking
const CLICKS_STORAGE_KEY = 'dori_login_button_clicks';
const CLICK_HISTORY_KEY = 'dori_login_click_history';
const ACTIVE_USERS_KEY = 'dori_login_active_users';

/**
 * Gets total MOQ button click count (1, 2, 3...)
 */
export function getClickCount(): number {
  if (typeof window === 'undefined') return 0;
  const count = localStorage.getItem(CLICKS_STORAGE_KEY);
  return count ? parseInt(count, 10) : 0;
}

/**
 * Gets total user/visitor count (1, 2, 3...) who have clicked the MOQ button
 */
export function getUserCount(): number {
  if (typeof window === 'undefined') return 0;
  const users = localStorage.getItem(ACTIVE_USERS_KEY);
  if (!users) return 0;
  try {
    const parsed = JSON.parse(users);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch (e) {
    return 0;
  }
}

/**
 * Gets detailed history of all MOQ button clicks with Click IDs
 */
export function getClickHistory(): ClickRecord[] {
  if (typeof window === 'undefined') return [];
  const history = localStorage.getItem(CLICK_HISTORY_KEY);
  if (!history) return [];
  try {
    return JSON.parse(history);
  } catch (e) {
    return [];
  }
}

/**
 * Records an MOQ button click from anywhere on the website.
 * Increments total click count, assigns Click ID (CLK-1, CLK-2...), tracks user count, and updates login side.
 */
export function recordMoqClick(
  productName?: string,
  price?: number,
  userInfo?: { email?: string; name?: string; id?: string }
): ClickRecord {
  if (typeof window === 'undefined') {
    return {
      id: 'CLK-1',
      clickNumber: 1,
      userCount: 1,
      buttonId: 'MOQ Button',
      productName: productName || 'Handcraft Item',
      userId: 'visitor-1',
      userName: 'Website Visitor',
      userEmail: 'visitor@website.com',
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  const currentCount = getClickCount() + 1;
  localStorage.setItem(CLICKS_STORAGE_KEY, currentCount.toString());

  // Track unique user/session IDs
  const activeUsersRaw = localStorage.getItem(ACTIVE_USERS_KEY);
  let activeUsers: string[] = [];
  try {
    activeUsers = activeUsersRaw ? JSON.parse(activeUsersRaw) : [];
  } catch (e) {
    activeUsers = [];
  }

  const userEmail = userInfo?.email || `user_${currentCount}@visitor.com`;
  if (!activeUsers.includes(userEmail)) {
    activeUsers.push(userEmail);
    localStorage.setItem(ACTIVE_USERS_KEY, JSON.stringify(activeUsers));
  }

  const userCount = activeUsers.length || 1;
  const clickId = `CLK-${currentCount}`;

  const newRecord: ClickRecord = {
    id: clickId,
    clickNumber: currentCount,
    userCount,
    buttonId: 'MOQ Button',
    productName: productName || 'Handcraft Product',
    userId: userInfo?.id || userEmail,
    userName: userInfo?.name || `Visitor #${userCount}`,
    userEmail: userEmail,
    timestamp: new Date().toLocaleTimeString(),
  };

  const history = getClickHistory();
  const updatedHistory = [newRecord, ...history].slice(0, 100);
  localStorage.setItem(CLICK_HISTORY_KEY, JSON.stringify(updatedHistory));

  // Trigger custom window event to update login side instantly
  window.dispatchEvent(new Event('dori_click_tracker_updated'));

  return newRecord;
}

/**
 * Saves updated click history array and recalculates counters.
 */
export function saveClickHistory(history: ClickRecord[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLICK_HISTORY_KEY, JSON.stringify(history));

  // Update total clicks count based on records
  const totalClicks = history.length > 0 ? Math.max(...history.map((r) => r.clickNumber || 0), history.length) : 0;
  localStorage.setItem(CLICKS_STORAGE_KEY, totalClicks.toString());

  // Update active users set based on records
  const uniqueUsers = Array.from(new Set(history.map((r) => r.userEmail).filter(Boolean)));
  localStorage.setItem(ACTIVE_USERS_KEY, JSON.stringify(uniqueUsers));

  window.dispatchEvent(new Event('dori_click_tracker_updated'));
}

/**
 * Updates a specific click record by ID in local storage.
 */
export function updateClickRecord(id: string, updatedFields: Partial<ClickRecord>): ClickRecord[] {
  const history = getClickHistory();
  const index = history.findIndex((r) => r.id === id);
  if (index !== -1) {
    history[index] = { ...history[index], ...updatedFields };
    saveClickHistory(history);
  }
  return history;
}

/**
 * Deletes a click record by ID from local storage.
 */
export function deleteClickRecord(id: string): ClickRecord[] {
  const history = getClickHistory();
  const filtered = history.filter((r) => r.id !== id);
  saveClickHistory(filtered);
  return filtered;
}

/**
 * Adds a custom click record manually to the excel sheet / history.
 */
export function addCustomClickRecord(record: Partial<ClickRecord>): ClickRecord[] {
  const history = getClickHistory();
  const nextNumber = history.length > 0 ? Math.max(...history.map((r) => r.clickNumber || 0)) + 1 : 1;
  const newRecord: ClickRecord = {
    id: record.id || `CLK-${nextNumber}`,
    clickNumber: record.clickNumber || nextNumber,
    userCount: record.userCount || 1,
    buttonId: record.buttonId || 'MOQ Button',
    productName: record.productName || 'Handcrafted Product',
    userId: record.userId || `visitor-${nextNumber}`,
    userName: record.userName || 'Website Visitor',
    userEmail: record.userEmail || `visitor${nextNumber}@website.com`,
    timestamp: record.timestamp || new Date().toLocaleTimeString(),
  };
  const updated = [newRecord, ...history];
  saveClickHistory(updated);
  return updated;
}

/**
 * Clears all MOQ click tracking data.
 */
export function clearAllClickRecords(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CLICK_HISTORY_KEY);
  localStorage.setItem(CLICKS_STORAGE_KEY, '0');
  localStorage.setItem(ACTIVE_USERS_KEY, JSON.stringify([]));
  window.dispatchEvent(new Event('dori_click_tracker_updated'));
}

/**
 * Exports click records as downloadable CSV (Excel compatible).
 */
export function exportToCsv(records: ClickRecord[]): void {
  if (typeof window === 'undefined') return;

  const headers = ['Click ID', 'Click No.', 'User Count', 'Button ID', 'Product Name', 'Visitor Name', 'Visitor Email', 'Timestamp'];
  const rows = records.map((r) => [
    `"${r.id}"`,
    r.clickNumber,
    r.userCount,
    `"${r.buttonId || 'MOQ Button'}"`,
    `"${(r.productName || '').replace(/"/g, '""')}"`,
    `"${(r.userName || '').replace(/"/g, '""')}"`,
    `"${(r.userEmail || '').replace(/"/g, '""')}"`,
    `"${r.timestamp}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `MOQ_Data_Sheet_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

