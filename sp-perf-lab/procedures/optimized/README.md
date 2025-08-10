# Optimized Procedures Overview

This folder will contain rewritten versions of naive procedures with applied optimizations such as:
- Combining queries to eliminate N+1 patterns
- Covering indexes to reduce random I/O
- Limiting result sets with keyset pagination
- Pre-aggregating with derived tables / CTEs
- Using appropriate join order and avoiding unnecessary sorting

Each procedure file will include a header comment detailing:
1. Problem observed in naive version
2. Optimization technique applied
3. Expected impact (e.g., fewer rows read, lower p95 latency)
4. Any trade-offs
