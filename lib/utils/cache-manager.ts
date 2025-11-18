/**
 * Sistema de cache para melhorar performance
 * Implementa estratégias de cache em memória e localStorage
 */

/**
 * Interface para item de cache
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // em milissegundos
}

/**
 * Configurações de TTL (Time To Live) por tipo de dado
 */
export const CACHE_TTL = {
  content: 1000 * 60 * 30, // 30 minutos - conteúdo raramente muda
  searchResults: 1000 * 60 * 5, // 5 minutos - resultados de busca
  userPreferences: 1000 * 60 * 60 * 24, // 24 horas - preferências
  favorites: Infinity, // Nunca expira - persistente
  annotations: Infinity, // Nunca expira - persistente
  apiResponses: 1000 * 60 * 10, // 10 minutos - respostas de API
  static: 1000 * 60 * 60, // 1 hora - dados estáticos
} as const;

/**
 * Cache em memória (mais rápido, mas não persiste)
 */
class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map();

  set<T>(key: string, data: T, ttl: number = CACHE_TTL.static): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn: ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) return null;

    // Verifica se expirou
    const isExpired = Date.now() - item.timestamp > item.expiresIn;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Limpa apenas items expirados
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiresIn) {
        this.cache.delete(key);
      }
    }
  }

  getSize(): number {
    return this.cache.size;
  }
}

/**
 * Cache em localStorage (persiste entre sessões)
 */
class LocalStorageCache {
  private prefix = 'aed3_cache_';

  set<T>(key: string, data: T, ttl: number = CACHE_TTL.static): void {
    if (typeof window === 'undefined') return;

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: ttl,
    };

    try {
      localStorage.setItem(
        `${this.prefix}${key}`,
        JSON.stringify(item)
      );
    } catch (error) {
      // localStorage cheio - limpar cache antigo
      this.cleanup();
      // Tentar novamente
      try {
        localStorage.setItem(
          `${this.prefix}${key}`,
          JSON.stringify(item)
        );
      } catch {
        console.warn('Não foi possível salvar no cache');
      }
    }
  }

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    const itemStr = localStorage.getItem(`${this.prefix}${key}`);

    if (!itemStr) return null;

    try {
      const item: CacheItem<T> = JSON.parse(itemStr);

      // Verifica se expirou
      const isExpired = Date.now() - item.timestamp > item.expiresIn;

      if (isExpired) {
        this.delete(key);
        return null;
      }

      return item.data;
    } catch {
      this.delete(key);
      return null;
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  cleanup(): void {
    if (typeof window === 'undefined') return;

    const now = Date.now();
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (!key.startsWith(this.prefix)) return;

      try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return;

        const item: CacheItem<any> = JSON.parse(itemStr);
        if (now - item.timestamp > item.expiresIn) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    });
  }

  getSize(): number {
    if (typeof window === 'undefined') return 0;

    const keys = Object.keys(localStorage);
    return keys.filter((key) => key.startsWith(this.prefix)).length;
  }
}

/**
 * Manager de cache que combina memória e localStorage
 */
class CacheManager {
  private memoryCache = new MemoryCache();
  private storageCache = new LocalStorageCache();

  /**
   * Salva no cache
   * @param key - Chave do cache
   * @param data - Dados a serem salvos
   * @param options - Opções de cache
   */
  set<T>(
    key: string,
    data: T,
    options: {
      ttl?: number;
      persist?: boolean;
    } = {}
  ): void {
    const { ttl = CACHE_TTL.static, persist = false } = options;

    // Sempre salva em memória (rápido)
    this.memoryCache.set(key, data, ttl);

    // Salva em localStorage se persist for true
    if (persist) {
      this.storageCache.set(key, data, ttl);
    }
  }

  /**
   * Recupera do cache
   * Tenta memória primeiro, depois localStorage
   */
  get<T>(key: string): T | null {
    // Tenta memória primeiro
    const memoryData = this.memoryCache.get<T>(key);
    if (memoryData !== null) return memoryData;

    // Tenta localStorage
    const storageData = this.storageCache.get<T>(key);
    if (storageData !== null) {
      // Promove para memória cache
      this.memoryCache.set(key, storageData);
      return storageData;
    }

    return null;
  }

  has(key: string): boolean {
    return this.memoryCache.has(key) || this.storageCache.has(key);
  }

  delete(key: string): void {
    this.memoryCache.delete(key);
    this.storageCache.delete(key);
  }

  clear(): void {
    this.memoryCache.clear();
    this.storageCache.clear();
  }

  cleanup(): void {
    this.memoryCache.cleanup();
    this.storageCache.cleanup();
  }

  getStats() {
    return {
      memory: this.memoryCache.getSize(),
      storage: this.storageCache.getSize(),
      total: this.memoryCache.getSize() + this.storageCache.getSize(),
    };
  }
}

// Instância singleton
export const cacheManager = new CacheManager();

// Auto-cleanup a cada 5 minutos
if (typeof window !== 'undefined') {
  setInterval(() => {
    cacheManager.cleanup();
  }, 1000 * 60 * 5);
}

/**
 * Hook para usar cache de forma reativa
 */
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    persist?: boolean;
  } = {}
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    // Verifica cache primeiro
    const cached = cacheManager.get<T>(key);
    if (cached !== null) {
      setData(cached);
      return;
    }

    // Busca dados
    setLoading(true);
    setError(null);

    try {
      const freshData = await fetcher();
      cacheManager.set(key, freshData, options);
      setData(freshData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Importação necessária
import { useState } from 'react';
