import { RateLimiterMemory } from "rate-limiter-flexible";

export const rateLimiter = new RateLimiterMemory({
    points: 3, // Number of points
    duration: 60, // Per second
});