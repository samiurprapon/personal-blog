import { Redis, RedisOptions } from 'ioredis';
import { isEqual } from 'lodash';

import { config } from '@/config/required';

import { IEnhancedRedis } from '@/utils/interfaces/IEnhancedRedis';

class RedisClient<T extends Redis> implements IEnhancedRedis {
	private static instance: RedisClient<Redis>;
	private redisInstance: T;
	private readonly defaultExpiration: number = 60 * 60 * 24; // 24 hours

	private constructor(redisInstance: T) {
		this.redisInstance = redisInstance;
	}

	/**
	 * Removes an element from a set
	 * @param key - Set key
	 * @param value - Value to remove
	 * @example
	 * await redis.removeElementFromListCache('fruits', 'apple');
	 */
	async removeElementFromListCache<T>(key: string, value: T): Promise<void> {
		try {
			const elements = await this.getListCache<T>(key);
			for (const item of elements) {
				if (isEqual(item, value)) {
					await this.redisInstance.srem(key, JSON.stringify(item));
					return;
				}
			}
		} catch (err) {
			console.error('RemoveElementFromListCache Error:', err);
			throw new Error(`Failed to remove element from list cache for key ${key}`);
		}
	}

	/**
	 * Checks if a value exists in a set
	 * @param key - Set key
	 * @param value - Value to find
	 * @returns true if value exists, false otherwise
	 * @example
	 * const exists = await redis.findListCache('fruits', 'apple');
	 */
	async findListCache<T>(key: string, value: T): Promise<boolean> {
		try {
			const elements = await this.getListCache<T>(key);
			return elements.some((item) => isEqual(item, value));
		} catch (err) {
			console.error('FindListCache Error:', err);
			throw new Error(`Failed to find element in list cache for key ${key}`);
		}
	}

	/**
	 * Deletes a hash field
	 * @param key - Hash key
	 * @param field - Hash field to delete
	 * @throws Error if deletion fails
	 * @example
	 * await redis.hdelCache('user:123:details', 'address');
	 */
	async hdelCache(key: string, field: string): Promise<void> {
		try {
			await this.redisInstance.hdel(key, field);
		} catch (err) {
			console.error('HDelCache Error:', err);
			throw new Error(`Failed to delete hash field ${field} for key ${key}`);
		}
	}

	/**
	 * Adds multiple values to a set
	 * @param key - Set key
	 * @param values - Values to add to the set
	 * @throws Error if addition fails
	 * @example
	 * await redis.saddCache('fruits', 'apple', 'banana', 'orange');
	 */
	async saddCache<T>(key: string, ...values: T[]): Promise<void> {
		try {
			const stringifiedValues = values.map((value) => JSON.stringify(value));
			await this.redisInstance.sadd(key, ...stringifiedValues);
		} catch (err) {
			console.error('SAddCache Error:', err);
			throw new Error(`Failed to add values to set for key ${key}`);
		}
	}

	/**
	 * Removes multiple values from a set
	 * @param key - Set key
	 * @param values - Values to remove from the set
	 * @throws Error if removal fails
	 * @example
	 * await redis.sremCache('fruits', 'apple', 'banana');
	 */
	async sremCache<T>(key: string, ...values: T[]): Promise<void> {
		try {
			const stringifiedValues = values.map((value) => JSON.stringify(value));

			await this.redisInstance.srem(key, ...stringifiedValues);
		} catch (err) {
			console.error('SRemCache Error:', err);
			throw new Error(`Failed to remove values from set for key ${key}`);
		}
	}

	/**
	 * Gets all members of a set
	 * @param key - Set key
	 * @returns Array of parsed values
	 * @example
	 * const fruits = await redis.smembersCache<string>('fruits');
	 * console.log(fruits); // ["apple", "banana", "orange"]
	 */
	async smembersCache<T>(key: string): Promise<T[]> {
		try {
			const members = await this.redisInstance.smembers(key);
			return members.map((member) => JSON.parse(member) as T);
		} catch (err) {
			console.error('SmembersCache Error:', err);
			throw new Error(`Failed to get set members for key ${key}`);
		}
	}

	/**
	 * Gets or creates a singleton instance of RedisClient
	 * @param options - Redis connection options
	 * @returns RedisClient instance
	 * @example
	 * const redis = RedisClient.getInstance({
	 *   maxRetriesPerRequest: 3,
	 *   connectTimeout: 10000
	 * });
	 */
	public static getInstance(options?: RedisOptions): RedisClient<Redis> {
		if (!RedisClient.instance) {
			const redisOptions: RedisOptions = {
				retryStrategy: (times: number) => {
					const delay = Math.min(times * 50, 2000);
					return delay;
				},
				maxRetriesPerRequest: 3,
				enableReadyCheck: true,
				...options,
			};

			RedisClient.instance = new RedisClient<Redis>(new Redis(config.REDIS_URI, redisOptions));

			RedisClient.instance.redisInstance.on('error', (err) => {
				console.error('[ error ] redis connection failed!');
				console.error('Redis Client Error:', err);
			});

			RedisClient.instance.redisInstance.on('connect', () => {
				console.info('[ ready ] redis connected!');
			});
		}

		return RedisClient.instance;
	}

	/**
	 * Sets a value in the cache with optional expiration
	 * @param key - Cache key
	 * @param value - Value to store (will be JSON stringified)
	 * @param duration - Expiration time in seconds (defaults to 24 hours)
	 * @example
	 * await redis.setCache('user:123', { name: 'John', age: 30 }, 3600);
	 */
	async setCache<T>(key: string, value: T, duration: number = this.defaultExpiration): Promise<void> {
		try {
			await this.redisInstance.set(key, JSON.stringify(value), 'EX', duration);
		} catch (err) {
			console.error('SetCache Error:', err);
			throw new Error(`Failed to set cache for key ${key}`);
		}
	}

	/**
	 * Retrieves a value from the cache
	 * @param key - Cache key
	 * @returns Parsed value or undefined if not found
	 * @example
	 * const user = await redis.getCache<User>('user:123');
	 * if (user) {
	 *   console.log(user.name); // "John"
	 * }
	 */
	async getCache<T>(key: string): Promise<T | undefined> {
		try {
			const data = await this.redisInstance.get(key);
			return data ? (JSON.parse(data) as T) : undefined;
		} catch (err) {
			console.error('GetCache Error:', err);
			throw new Error(`Failed to get cache for key ${key}`);
		}
	}

	/**
	 * Deletes a key or pattern from the cache
	 * @param key - Key or pattern to delete (supports * wildcard)
	 * @example
	 * // Delete single key
	 * await redis.delCache('user:123');
	 *
	 * // Delete all keys matching pattern
	 * await redis.delCache('user:*');
	 */
	async delCache(key: string): Promise<void> {
		try {
			if (key.endsWith('*')) {
				await this.deletePatternCache(key);
			} else {
				await this.redisInstance.del(key);
			}
		} catch (err) {
			console.error('DelCache Error:', err);
			throw new Error(`Failed to delete cache for key ${key}`);
		}
	}

	/**
	 * Sets a hash field
	 * @param key - Hash key
	 * @param field - Hash field
	 * @param value - Value to store
	 * @example
	 * await redis.hsetCache('user:123:details', 'address', {
	 *   street: '123 Main St',
	 *   city: 'Boston'
	 * });
	 */
	async hsetCache<T>(key: string, field: string, value: T): Promise<void> {
		try {
			await this.redisInstance.hset(key, field, JSON.stringify(value));
		} catch (err) {
			console.error('HSetCache Error:', err);
			throw new Error(`Failed to set hash field ${field} for key ${key}`);
		}
	}

	/**
	 * Gets a hash field value
	 * @param key - Hash key
	 * @param field - Hash field
	 * @returns Parsed value or undefined
	 * @example
	 * const address = await redis.hgetCache<Address>('user:123:details', 'address');
	 * if (address) {
	 *   console.log(address.street); // "123 Main St"
	 * }
	 */
	async hgetCache<T>(key: string, field: string): Promise<T | undefined> {
		try {
			const data = await this.redisInstance.hget(key, field);
			return data ? (JSON.parse(data) as T) : undefined;
		} catch (err) {
			console.error('HGetCache Error:', err);
			throw new Error(`Failed to get hash field ${field} for key ${key}`);
		}
	}

	/**
	 * Gets all fields and values from a hash
	 * @param key - Hash key
	 * @returns Record of field names to parsed values
	 * @example
	 * const details = await redis.hgetallCache<UserDetails>('user:123:details');
	 * console.log(details.address.street);
	 * console.log(details.preferences.theme);
	 */
	async hgetallCache<T>(key: string): Promise<Record<string, T>> {
		try {
			const data = await this.redisInstance.hgetall(key);
			const result: Record<string, T> = {};

			for (const [field, value] of Object.entries(data)) {
				result[field] = JSON.parse(value) as T;
			}

			return result;
		} catch (err) {
			console.error('HGetAllCache Error:', err);
			throw new Error(`Failed to get all hash fields for key ${key}`);
		}
	}

	/**
	 * Gets all members of a set
	 * @param key - Set key
	 * @returns Array of parsed values
	 * @example
	 * const fruits = await redis.getListCache<string>('fruits');
	 * console.log(fruits); // ["apple", "banana", "orange"]
	 */
	async getListCache<T>(key: string): Promise<T[]> {
		try {
			const result = await this.redisInstance.smembers(key);
			return result.map((item) => JSON.parse(item) as T);
		} catch (err) {
			console.error('GetListCache Error:', err);
			throw new Error(`Failed to get list cache for key ${key}`);
		}
	}

	/**
	 * Adds an element to a set, removing duplicates
	 * @param key - Set key
	 * @param value - Value to add
	 * @param neverExpire - If true, the key will never expire
	 * @example
	 * await redis.addElementToListCache('fruits', 'apple');
	 * await redis.addElementToListCache('fruits', 'banana', true); // Never expires
	 */
	async addElementToListCache<T>(key: string, value: T, neverExpire: boolean = false): Promise<void> {
		try {
			const elements = await this.getListCache<T>(key);

			for (const item of elements) {
				if (isEqual(item, value)) {
					await this.redisInstance.srem(key, JSON.stringify(item));
				}
			}

			await this.redisInstance.sadd(key, JSON.stringify(value));

			if (neverExpire) {
				await this.redisInstance.persist(key);
			} else {
				await this.redisInstance.expire(key, this.defaultExpiration);
			}
		} catch (err) {
			console.error('AddElementToListCache Error:', err);
			throw new Error(`Failed to add element to list cache for key ${key}`);
		}
	}

	/**
	 * Adds a member to a sorted set
	 * @param key - Sorted set key
	 * @param score - Score for ordering
	 * @param value - Member value
	 * @example
	 * await redis.zaddCache('highscores', 1000, {
	 *   player: 'John',
	 *   timestamp: Date.now()
	 * });
	 */
	async zaddCache<T>(key: string, score: number, value: T): Promise<void> {
		try {
			await this.redisInstance.zadd(key, score, JSON.stringify(value));
		} catch (err) {
			console.error('ZAddCache Error:', err);
			throw new Error(`Failed to add sorted set member for key ${key}`);
		}
	}

	/**
	 * Gets a range of members from a sorted set
	 * @param key - Sorted set key
	 * @param start - Start index
	 * @param stop - Stop index
	 * @returns Array of parsed values in range
	 * @example
	 * // Get top 10 scores
	 * const topScores = await redis.zrangeCache('highscores', 0, 9);
	 */
	async zrangeCache<T>(key: string, start: number, stop: number): Promise<T[]> {
		try {
			const results = await this.redisInstance.zrange(key, start, stop);
			return results.map((item) => JSON.parse(item) as T);
		} catch (err) {
			console.error('ZRangeCache Error:', err);
			throw new Error(`Failed to get sorted set range for key ${key}`);
		}
	}

	/**
	 * Checks if a key exists
	 * @param key - Key to check
	 * @returns true if key exists, false otherwise
	 * @example
	 * if (await redis.exists('user:123')) {
	 *   console.log('User exists in cache');
	 * }
	 */
	async exists(key: string): Promise<boolean> {
		const result = await this.redisInstance.exists(key);
		return result === 1;
	}

	/**
	 * Gets the remaining time to live of a key
	 * @param key - Key to check
	 * @returns TTL in seconds, -2 if key doesn't exist, -1 if key has no expiry
	 * @example
	 * const ttl = await redis.ttl('user:123');
	 * console.log(`Key expires in ${ttl} seconds`);
	 */
	async ttl(key: string): Promise<number> {
		return await this.redisInstance.ttl(key);
	}

	/**
	 * Scans for keys matching a pattern
	 * @param pattern - Pattern to match (e.g., "user:*")
	 * @returns Array of matching keys
	 * @example
	 * const userKeys = await redis.scanKeys('user:*');
	 * console.log(`Found ${userKeys.length} user keys`);
	 */
	async scanKeys(pattern: string): Promise<string[]> {
		const keys: string[] = [];
		let cursor = '0';

		do {
			const [nextCursor, scanKeys] = await this.redisInstance.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
			cursor = nextCursor;
			keys.push(...scanKeys);
		} while (cursor !== '0');

		return keys;
	}

	/**
	 * Deletes all keys matching a pattern
	 * @private
	 * @param pattern - Pattern to match
	 */
	protected async deletePatternCache(pattern: string): Promise<void> {
		try {
			const keys = await this.scanKeys(pattern);
			if (keys.length > 0) {
				await this.redisInstance.del(...keys);
			}
		} catch (err) {
			console.error('DeletePatternCache Error:', err);
			throw new Error(`Failed to delete pattern cache for pattern ${pattern}`);
		}
	}

	/**
	 * Checks the Redis connection
	 * @returns "PONG" if successful
	 * @example
	 * try {
	 *   await redis.ping();
	 *   console.log('Redis is connected');
	 * } catch (err) {
	 *   console.error('Redis connection failed');
	 * }
	 */
	async ping(): Promise<string> {
		return await this.redisInstance.ping();
	}

	/**
	 * Deletes all keys from the current database
	 * @example
	 * await redis.flushdb();
	 * console.log('Cache cleared');
	 */
	async flushdb(): Promise<void> {
		await this.redisInstance.flushdb();
	}

	/**
	 * Closes the Redis connection
	 * @example
	 * await redis.quit();
	 * console.log('Redis connection closed');
	 */
	async quit(): Promise<void> {
		await this.redisInstance.quit();
	}

	/**
	 * Gets all keys matching a pattern
	 * @example
	 * const keys = await redis.keys('user:*');
	 *
	 * @returns Array of matching keys
	 *
	 */
	async keys(pattern: string): Promise<string[]> {
		return await this.redisInstance.keys(pattern);
	}

	/**
	 * Creates a duplicate Redis connection
	 * @returns New Redis instance with same configuration
	 * @example
	 * const newConnection = redis.duplicate();
	 */
	duplicate(): Redis {
		return this.redisInstance.duplicate();
	}
}

// Export singleton instance and pub/sub clients
export default RedisClient.getInstance();

const publisher = RedisClient.getInstance().duplicate();
const subscriber = RedisClient.getInstance().duplicate();

export { publisher, subscriber };
