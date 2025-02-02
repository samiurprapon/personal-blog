import Redis from 'ioredis';

export interface IEnhancedRedis {
	setCache<T>(key: string, value: T, duration: number): Promise<void>;
	getCache<T>(key: string): Promise<T | undefined>;
	delCache(key: string): Promise<void>;
	getListCache<T>(key: string): Promise<T[]>;
	addElementToListCache<T>(key: string, value: T, neverExpire?: boolean): Promise<void>;
	removeElementFromListCache<T>(key: string, value: T): Promise<void>;
	findListCache<T>(key: string, value: T): Promise<boolean>;
	hsetCache<T>(key: string, field: string, value: T): Promise<void>;
	hgetCache<T>(key: string, field: string): Promise<T | undefined>;
	hgetallCache<T>(key: string): Promise<Record<string, T>>;
	hdelCache(key: string, field: string): Promise<void>;
	saddCache<T>(key: string, ...values: T[]): Promise<void>;
	sremCache<T>(key: string, ...values: T[]): Promise<void>;
	smembersCache<T>(key: string): Promise<T[]>;
	zaddCache<T>(key: string, score: number, value: T): Promise<void>;
	zrangeCache<T>(key: string, start: number, stop: number): Promise<T[]>;
	exists(key: string): Promise<boolean>;
	ttl(key: string): Promise<number>;
	scanKeys(pattern: string): Promise<string[]>;
	ping(): Promise<string>;
	flushdb(): Promise<void>;
	quit(): Promise<void>;
	duplicate(): Redis;
}
