// Demo rejim uchun brauzer xotirasi. Xususiy oynada ishlamasligi mumkin — shuning uchun try/catch.
export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(`lc:${key}`);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(`lc:${key}`, JSON.stringify(value));
    } catch {
      /* e’tiborsiz */
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(`lc:${key}`);
    } catch {
      /* e’tiborsiz */
    }
  },
};
