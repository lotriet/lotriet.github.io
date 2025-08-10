# Stored Procedure Performance Lab

Purpose: A reproducible lab to compare naive vs optimized MySQL stored procedures using synthetic OLTP-style data. Benchmarks run via a .NET console harness (Dapper) and output JSON results for visualization.

## High-Level Roadmap
1. Schema & Seed Data
2. Naive Procedures (baseline)
3. Benchmark Harness (initial timing + percentiles) ✅ initial
4. Optimization Passes (indexes, covering queries, batching, temp tables)
5. Metrics Collection (rows read/returned, handler stats)
6. Result Visualization (HTML/Chart.js or notebook)
7. Additional Scenarios (pagination, filtering, aggregation)
8. Documentation of Findings

## Folder Structure
- bench/ : .NET 9 console app benchmark harness
- schema/ : DDL scripts (tables, indexes)
- procedures/naive : Baseline stored procedures
- procedures/optimized : Improved variants with rationale
- results/ : Raw JSON benchmark output files
- docs/ : Explanations & tuning case studies
- infra/ : Docker Compose, MySQL config (performance_schema, innodb settings)
- scripts/ : Data generation or utility scripts

## Bench Harness
Outputs a timestamped JSON file with: name, iterations, avg, p95, p99 (rows read/returned pending metrics integration).

Config file: bench/benchconfig.json

## Next Steps
- Add schema DDL and initial naive procedure (sp_get_orders_naive)
- Implement data seeding script
- Integrate rows read/returned metrics via information_schema + SHOW STATUS snapshotting

## Disclaimer
Synthetic example for learning. Not production guidance.
